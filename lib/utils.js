import { getDate, getDaysInMonth, getMonth, getYear } from "date-fns";
import { MONTHS_SHORT } from "./constants.js";
import Logger from "./logging.js";

const getArraySumByKey = (arr = [], key ) => {
    if (!key) return 0;
    return arr.reduce( (sum, item) => sum + item[key] || 0, 0 );
}

export const isDevelopmentEnv = () => {
	const env = process.env.NODE_ENV || "development";
	return env === "development";
};

export const getResponseErrorFormat = (
	msg = "Something Went Wrong with server",
	errCode = 500
) => ({
	meta: {
		success: false,
		msg,
		code: errCode,
	},
});

export const getResponseFormat = (data, msg = "", code = 200) => ({
	meta: {
		success: true,
		code,
		msg,
	},
	data,
});

const getFirstMonthPaymentAmount = ({ createdAt, monthlyFee, monthlyFeeRounded }) => {
    const payingMonth = getMonth(createdAt);
    const payingYear = getYear(createdAt);
    const daysInMonth = getDaysInMonth(createdAt);
    const onboardingDate = getDate(createdAt);

    const pay = (daysInMonth - onboardingDate) * monthlyFee / daysInMonth;
    const paymentMonth = `${payingMonth}_${payingYear}`;
    return { 
        pay: +pay.toFixed(2),
        paymentMonth,
        onboardingDate,
        daysInMonth,
        isFirstPayment: true,
        monthlyFee: monthlyFeeRounded
    };
}

const getCurrDate = () => {
    const currDate = new Date();
    const currMonth = getMonth(currDate);
    const currYear = getYear(currDate);
    return { currMonth, currYear };
}

const getLastDate = (lastDate) => {
    const [ lm, ly ] = lastDate.split('_');
    return {lastMonth: +lm, lastYear: +ly };
}

export const calculatePaymentAmount = ({createdAt, lastPaymentAt, amenities = []}) => {
    const monthlyFee = getArraySumByKey(amenities, 'fee');
    const monthlyFeeRounded = +monthlyFee.toFixed(2);

    const isFirstPayment = !lastPaymentAt;
    if(isFirstPayment) return getFirstMonthPaymentAmount({createdAt, monthlyFee, monthlyFeeRounded});

    const { currMonth, currYear } = getCurrDate();    
    const { lastMonth, lastYear } = getLastDate(lastPaymentAt);
    
    const isSameMonth = lastMonth === currMonth && lastYear === currYear;
    if( isSameMonth ) return { pay: 0 };

    let paymentMonth = `${lastMonth + 1}_${lastYear}`;
    if((currYear > lastYear) && (lastMonth === 11)) {
        paymentMonth = `0_${lastYear + 1}`;
    }

    return { pay: monthlyFeeRounded, paymentMonth, monthlyFee: monthlyFeeRounded };
}

export const sortByDateKeys = (obj = {}) => {
    const keys = Object.keys(obj);
    keys.sort((key1, key2) => {
        const [ month1, year1 ] = key1.split('_');
        const [ month2, year2 ] = key2.split('_');
        if ( year1 > year2 ) return -1;
        if ( year2 > year1) return 1;
        if (month1 > month2) return -1;
        if(month2 > month1) return 1;
        return 0;
    })

    return keys.map(key => {
        const [ month, year ] = key.split('_');
        return { month: MONTHS_SHORT[month], year: +year, amount: obj[key] };
    });
}

/*
*   Filter basic amenities from all amenities
*/
export const filterBasicAmenities = (amenities = [], includeBasic = '' ) => {
    if(!includeBasic) {
        return amenities;
    }
    if(includeBasic === 'yes') {
        return amenities.filter(({ type }) => type === 'basic' );
    }
    return amenities.filter(({ type }) => type !== 'basic' );
}



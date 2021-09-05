import { getDate, getDaysInMonth, getMonth, getYear } from "date-fns";
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

export const calculatePaymentAmountV2 = ({createdAt, lastPaymentAt, amenities = []}) => {
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



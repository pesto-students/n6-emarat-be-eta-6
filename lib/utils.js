import { differenceInCalendarMonths, getDate, getDaysInMonth, getMonth, parseISO } from "date-fns";
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

export const calculatePaymentAmount = ({createdAt, lastPaymentAt, amenities = []}) => {
    const isFromCreationDate = !lastPaymentAt;
    const monthlyFee = getArraySumByKey(amenities, 'fee');
    const fromDate =  lastPaymentAt || createdAt;
    const toDate = new Date();

    const months = differenceInCalendarMonths(toDate, fromDate);
    if(!months) return {total: 0, meta: []};
    const fromMonth = getMonth(fromDate);
    let paymentMeta = [];
    for (let i = 0; i <= months; i++) {
        if( (i === 0) && isFromCreationDate) {
            const daysInMonth = getDaysInMonth(fromDate);
            const firstMonthAmount = (daysInMonth - getDate(fromDate)) * monthlyFee / daysInMonth;
            paymentMeta.push({
                month: fromMonth,
                amount: +firstMonthAmount.toFixed(2), 
            });
            continue;
        }
        paymentMeta.push({
            month: fromMonth + i,
            amount: +monthlyFee.toFixed(2),
        });
    }
    const total = getArraySumByKey(paymentMeta, 'amount');
    return {
        total,
        meta: paymentMeta,
        fromDate,
        toDate,
    };
}

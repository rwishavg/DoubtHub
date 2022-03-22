export const convertDate = (createdAt) => {
	if (createdAt === undefined) return "";
	let result = createdAt.substring(0, 10);
	let day = result.substring(8, 10);
	let month = result.substring(5, 7);
	let year = result.substring(0, 4);
	if (month === "01") month = "Jan";
	else if (month === "02") month = "Feb";
	else if (month === "03") month = "Mar";
	else if (month === "04") month = "Apr";
	else if (month === "05") month = "May";
	else if (month === "06") month = "Jun";
	else if (month === "07") month = "Jul";
	else if (month === "08") month = "Aug";
	else if (month === "09") month = "Sep";
	else if (month === "10") month = "Oct";
	else if (month === "11") month = "Nov";
	else if (month === "12") month = "Dec";
	result = day + " " + month + " " + year;
	return result;
};

export const shorten = (str = "", maxLen, separator = " ") => {
	if (str === "") return str;
	else if (str.length <= maxLen) return str;
	else {
		let tt = str.substr(0, str.lastIndexOf(separator, maxLen));
		tt = tt + "...";
		return tt;
	}
};

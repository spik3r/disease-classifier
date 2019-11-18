import moment from "moment";

const DATE_FORMAT = 'YYYY/MM/DD.';
const getLast = (data) => {
    if (!data || data.length === 0) {
        return false;
    }
    return data.reduce((prev, current) => (moment(prev.atDate, DATE_FORMAT) > moment(current.atDate, DATE_FORMAT)) ? prev : current);

};

const getToday = () => {
    return new moment().toISOString().substr(0, 10).replace(/-/g, '/');
};
export {getLast, getToday}
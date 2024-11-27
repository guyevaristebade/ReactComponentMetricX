import moment from 'moment'

export const formatDate = (date) => {
    return moment(date, 'DD-MM-YYYYTHH:mm:ss').toDate()
}

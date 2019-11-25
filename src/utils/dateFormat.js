import moment from 'moment'

export const dateForUsersFormat = 'DD/MM/YYYY HH:mm'//'dd/MM/yyyy hh:mm'
export const dateForSystemFormat = 'YYYY-MM-DD HH:mm'//'yyyy-MM-dd hh:mm'

export const convertToDate = (dateString, format) => moment(dateString, format).toDate()
export const formatDate = (date, format = dateForUsersFormat) => {

    if (!!date && date instanceof Date)
        return moment(date).format(format)

    throw 'Invalid Date!!!'
}

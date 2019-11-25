import uuid from 'uuid/v1'
import moment from 'moment'
import { formatDate, dateForSystemFormat } from '../utils/dateFormat'
class Appointment {

    constructor(data = {}) {
        this.setFields(data)
    }

    id = null
    id_on_device = null
    client_id = null
    reason = null
    datetime = null
    ubication_latitude = null
    ubication_longitude = null
    check_in = false
    finished = false
    sync = false
    notification_date = null

    getFieldsList = _ => [
        'id',
        'id_on_device',
        'sync',
        'client_id',
        'reason',
        'datetime',
        'ubication_latitude',
        'ubication_longitude',
        'check_in',
        'finished',
        'notification_date',
        'hours_before_notification'
    ]

    getDatas = _ => {
        let fields = {}
        this.getFieldsList().map(fieldName => {
            fields[fieldName] = this[fieldName]
        })
        return fields
    }
    setFields = data =>
        this.getFieldsList().map(fieldName => {
            this[fieldName] = data[fieldName]
        })
    beforeCreate = ({ hoursBeforeAppointmentNotification }) => {
        this.generateDeviceId()
        this.calculateNotificationDate(hoursBeforeAppointmentNotification)
    }
    calculateNotificationDate = hours => {
        if (!this['notification_date']) {
            let date = moment(this['datetime']).subtract(hours, 'hours').toDate()
            this['notification_date'] = formatDate(date, dateForSystemFormat)

        }
    }
    generateDeviceId = _ => {
        if (!this['id_on_device'])
            this['id_on_device'] = uuid()
    }
    checkInAppointment = _ => {
        this['check_in'] = true
    }
    finishAppointment = _ => {
        this['finished'] = true
    }
    isCheckedIn = _ => this['check_in']
    isFinished = _ => this['finished']

    isNew = _ => !this['id_on_device']
    getDate = _ => this.datetime.substring(0, 10)

    get name() {
        return this.reason
    }
    get ubication() {
        return {
            latitude: this.ubication_latitude,
            longitude: this.ubication_longitude
        }
    }
    get hours_before_notification() {
        let hours = moment(this['datetime']).diff(this['notification_date'], 'hours', true)
        return hours
    }
}

export default Appointment
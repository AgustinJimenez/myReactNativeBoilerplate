import moment from 'moment'
import { hoursMinutesFormat, dateForSystemFormat, dateForUsersFormat } from '../utils/dateFormat'
import uuid from 'uuid/v1'
import { STEPS } from '../constants'
interface AppointmentHeader {
    branch_in_id?: number 
    branch_out_id?: number
    people_in_id?: number
    people_out_id?: number
}
interface Client {
    id?: number
    name?: string 
}
interface AppointmentInterface {
    id?: number
    id_on_device?: string
    appointment_date: string
    current_step: string
    header: AppointmentHeader
    reasons: Array<number>
    sequence: Array<string>
    step_informations: object
    client?: Client
    sync: boolean
    syncronizing: boolean
}
class Appointment implements AppointmentInterface {
    id?: number
    id_on_device?: string
    appointment_date: string = ''
    current_step: string = STEPS.VISIT
    header: AppointmentHeader = {
        branch_in_id: undefined,
        branch_out_id: undefined,
        people_in_id: undefined,
        people_out_id: undefined
    }
    reasons: Array<number> = []
    sequence: Array<string> = []
    step_informations: object = {}
    sync: boolean = false
    syncronizing: boolean = false
    client?: Client = {
        id: undefined,
        name: ''
    }

    constructor(data: any) {
        if(!!data) {
            this['id_on_device'] = !!data['id_on_device'] ? data['id_on_device'] : uuid()
            this['id'] = data['id']
            this['appointment_date'] = data['appointment_date']
            this['current_step'] = data['current_step']
            this['header'] = data['header']
            this['reasons'] = data['reasons']
            this['sequence'] = data['sequence']
            this['step_informations'] = data['step_informations']
            this['syncronizing'] = data['syncronizing']
            this['sync'] = data['sync']
        } else {
            this['id_on_device'] = uuid()
        }
        //super(data, attributes)
    }
    getDatas = (): AppointmentInterface => ({
        id_on_device: this['id_on_device'],
        id: this['id'],
        appointment_date: this['appointment_date'],
        current_step: this['current_step'],
        header: this['header'],
        reasons: this['reasons'],
        sequence: this['sequence'],
        step_informations: this['step_informations'],
        //client: this['client'],
        sync: this['sync'],
        syncronizing: this['syncronizing']
    })
    get datetime() {
        return this['appointment_date']
    }
    get time() {
        return (this['appointment_date'] || '').substring(11, 16)
    }
    get date() {
        return (this['appointment_date'] || '').substring(0, 10)
    }
    get dateTimeInMoment(){ 
        return moment(this['appointment_date'], dateForSystemFormat)
    }
    get getDateTimeFormated(){ 
        return this.dateTimeInMoment.format(dateForUsersFormat)
    }
    get getTimeFormated(){ 
        return this.dateTimeInMoment.format(hoursMinutesFormat)
    }
    get client_id() {
        if(!!this['header'] && !!this['header']['people_in_id'])
            return this['header']['people_in_id']
        return null
    }
    get clientName() {
        if(!!this['client'] && !!this['client']['name'])
            return this['client']['name']
        return '[client not found]'
    }
    get name() {
        if( !!this['client'] && !!this['client']['name'] )
            return this['client']['name']
        return null
    }
    setStepValue = (step: string, stepValueName: string, type: string, value: any) => {
        let step_info = this['step_informations'][step]
        if(!step_info) {
            step_info = [{
                name: stepValueName,
                value,
                type: stepValueName,
            }]
        } else {
            step_info = step_info.map((field: any, key: number) => {
                if(field.name===stepValueName) {
                    field.value = value
                }
                return field
            })
        }
        this['step_informations'][step] = step_info
        this['sync'] = false
    }
    setStartNote = (value: string) => {
        this.setStepValue('VST', 'note', 'textarea',value)
    }
    get startNote() {
        var step_info = this['step_informations']['VST']
        var startNote = ''
        if( !!step_info)
        step_info.some(({name, value}: any) => {
            if(name==='note'){
                startNote = value
                return true
            }
        })
        return startNote
    }
    setFinalNote = (value: string) => {
        this.setStepValue('SVT', 'note', 'textarea', value)
    }
    get finalNote() {
        var step_info = this['step_informations']['SVT']
        var finalNote = ''
        if( !!step_info)
        step_info.map(({name, value}: any) => {
            if(name==='note')
                finalNote = value
        })
        return finalNote
    }
    setUbication = ({latitude, longitude}) => {
        var value = JSON.stringify({lat: latitude, lng: longitude})
        this.setStepValue('AGD', 'location', 'location', value)
    }
    mergeOverStructure = (structure: any) => {
        this['step_informations'] = { ...structure['step_informations'], ...this['step_informations'] }
        Object.keys(this['step_informations']).map((stepId: string) => {
            this['step_informations'][stepId] = this['step_informations'][stepId].map(
                ({ label, name, type, value }: any) => ({ label, name, type, value })
            )
        })
        this['sequence'] = structure['sequence']
        Object.keys(structure['header']).map((key: string) => {
            this['header'][key] = this['header'][key] || structure['header'][key]    
        })
    }
    get ubication() {
        var step_info = this['step_informations']['AGD']
        var latitude, longitude
        if(!!step_info )
            step_info.some(({name, value}: any) => {
                if(name==='location') {
                    let {lat, lng} = JSON.parse(value) || {}
                    latitude = lat
                    longitude = lng
                }
            })

        return {
            latitude,
            longitude
        }
    }
    setCheckInUbication = ({latitude, longitude}) => {
        let value = JSON.stringify({lat: latitude, lng: longitude})
        this.setStepValue('EVT', 'location', 'location', value)
    }
    get checkInUbication() {
        var step_info = this['step_informations']['EVT'] || []
        var ubication: any = {lat: null, lng: null}
        if(!!step_info )
            step_info.map(({name, value}: any) => {
                if(name==='location')
                    ubication = JSON.parse(value) || {}
            })
        return {
            latitude: ubication.lat,
            longitude: ubication.lng
        }
    }
    /*
    get name() {
        if (!!this.client && !!this.client.name) return this.client.name
        else return '[nameless]'
    }
    get formatedDatetime() {
        return moment(this.datetime).format(dateForUsersFormat)
    }
     */
}
export default Appointment

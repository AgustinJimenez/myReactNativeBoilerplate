import uuid from 'uuid/v1'
interface BaseModelInterface {
    id_on_device: string;
    defaultAttributes: any;
}

class BaseModel implements BaseModelInterface {
    id_on_device: string = ''
    defaultAttributes: any

    constructor(data: any = {}, attributes: any) {
        this.setFields(data, attributes)
    }

    setFields = (data: any, attributes: any) => {
        this['defaultAttributes'] = attributes
        if (!data['id_on_device']) data['id_on_device'] = uuid()
        Object.keys(attributes).map((fieldName: string) => {
            if (data[fieldName] !== undefined) this[fieldName] = data[fieldName]
            else this[fieldName] = attributes[fieldName]
        })
    }

    getDatas = () => {
        let fields = {}
        Object.keys(this['defaultAttributes']).map((fieldName: string) => {
            fields[fieldName] = this[fieldName]
        })
        return fields
    }

    isNew = () => !this['id_on_device']
}

export default BaseModel

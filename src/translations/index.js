import data from './data.json'

const listIds = Object.keys(data)
const getDataLang = lang => {
    var dataLang = {}
    listIds.map(id => (dataLang[id] = data[id][lang]))
    return dataLang
}

export const en = {
    translation: getDataLang('en'),
}
export const es = {
    translation: getDataLang('es'),
}

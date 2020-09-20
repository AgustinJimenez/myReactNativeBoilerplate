import initialState from './initialState.json'
const getDataset = (state: any, datasetName: string) => {
    let dataset = state[datasetName]
    return dataset
}
export const persistSelector = ({ _persist: any = null }) => {
    return (
        _persist || {
            version: null,
            rehydrated: false,
        }
    )
}
export const datasetSelector = (state: any, datasetName: string, { list_format = false } = {}) => {
    let selected_dataset = getDataset(state, datasetName)
    //console.log('datasetSelector ===> ', { selected_dataset, datasetName })
    if (list_format) return Object.keys(selected_dataset).map(id => selected_dataset[id])

    return selected_dataset
}

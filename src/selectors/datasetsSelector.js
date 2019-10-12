const getDataset = (state, datasetName) => {
    let dataset = state['datasets'][datasetName]
    //console.log('SELECTOR getDataset ===> ', { state, datasetName, dataset })
    return dataset
}
export const usersSelector = state => getDataset(state, 'users')
export const appointmentsSelector = state => getDataset(state, 'appointments')

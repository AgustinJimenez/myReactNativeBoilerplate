const getDataset = (state, datasetName) => {
    let dataset = {
        error: state['datasets']['_error'][datasetName],
        loading: state['datasets']['_loading'][datasetName],
        data: state['datasets'][datasetName],
    }

    //console.log('SELECTOR getDataset ===> ', { state, datasetName, dataset })
    return dataset
}
export const usersSelector = state => getDataset(state, 'users')
export const appointmentsSelector = state => getDataset(state, 'appointments')
export const authSelector = state => getDataset(state, 'auth')

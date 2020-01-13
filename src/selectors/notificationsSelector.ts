const datasetName = 'notifications'
const notificationsSelector = (state: any) => state[datasetName]
export const listNotificationsSelector = (state: any) => {
    let notifications = notificationsSelector(state)
    let listIds: any = Object.keys(notifications)
    let list = listIds.map((id: any) => state[datasetName][id])
    return list
}
export default notificationsSelector

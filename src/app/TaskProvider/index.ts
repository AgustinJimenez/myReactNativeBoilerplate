import { useEffect } from 'react'
import BackgroundFetch from 'react-native-background-fetch'
//import showToast from '..//utils/showToast'
import BackgroundFetchConfig from './BackgroundFetchConfig'
import { runTasksSaga } from '../../actions'
import { useDispatch } from 'react-redux'

const runTasks = async (dispatch: any) =>
    dispatch(
        runTasksSaga({
            afterFinishCallback: () => {
                BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
            },
        }),
    )

const TaskProvider = (props: any) => {
    const dispatch = useDispatch()
    useEffect(() => {
        BackgroundFetch.status(status => {
            switch (status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    //console.log("BackgroundFetch restricted");
                    break
                case BackgroundFetch.STATUS_DENIED:
                    //console.log("BackgroundFetch denied");
                    break
                case BackgroundFetch.STATUS_AVAILABLE:
                    BackgroundFetch.configure(
                        BackgroundFetchConfig,
                        () => runTasks(dispatch),
                        error => console.log('[js] RNBackgroundFetch failed to start', error),
                    )
                    BackgroundFetch.registerHeadlessTask(() => runTasks(dispatch))
                    break
            }
        })
    }, [])

    return null
}
export default TaskProvider

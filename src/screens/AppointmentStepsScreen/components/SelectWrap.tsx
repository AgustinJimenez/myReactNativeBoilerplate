import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Label, CardItem, Body } from 'native-base'
import styles from '../../AppointmentFormScreen/styles'
import { fetchReasonsAction } from '../../../actions'
import { reasonsSelector } from '../../../selectors/datasetsSelector'
import Select from '../../../components/utils/Select'

var reasonInputTimer: any
const SelectWrap = ({ onValueChange, selectedsReasons, label_id, name }: any) => {
    let { t } = useTranslation()
    let dispatch = useDispatch()
    const [isFetching, setIsFetching] = React.useState(false)
    var fetchDatas = async (text = '') => {
        await setIsFetching(true)
        //dispatch(fetchReasonsAction({ searchName: text, onFinishCallback: () => setIsFetching(false) }))
    }
    React.useEffect(() => {
        fetchDatas()
    }, [])
    let reasons = useSelector(reasonsSelector)
    let pickerList = reasons.map(({ id, name }) => ({ value: id, label: name }))
    return (
        <CardItem>
            <Body>
                <Label style={styles.labelPadder}>{t(label_id) + ':'}</Label>
                <Select
                    placeholder={t(name)}
                    //style={}
                    iosHeader={t(name)}
                    selectedValue={null}
                    onValueChange={() => {}}
                    items={[]}
                />
            </Body>
        </CardItem>
    )
}
export default SelectWrap

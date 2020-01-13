import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Label, CardItem, Body } from 'native-base'
import styles from '../styles'
import SearchPicker from '../../../components/SearchPicker'
import { fetchReasonsAction } from '../../../actions'
import { reasonsSelector } from '../../../selectors/datasetsSelector'

var reasonInputTimer: any
const ReasonInput = ({ onValueChange, selectedsReasons }: any) => {
    let { t } = useTranslation()
    let dispatch = useDispatch()
    const [isFetching, setIsFetching] = React.useState(false)
    var fetchDatas = async (text = '') => {
        await setIsFetching(true)
        dispatch(fetchReasonsAction({ searchName: text, onFinishCallback: () => setIsFetching(false) }))
    }
    React.useEffect(() => {
        fetchDatas()
    }, [])
    let reasons = useSelector(reasonsSelector)
    let pickerList = reasons.map(({ id, name }) => ({ value: id, label: name }))
    return (
        <CardItem>
            <Body>
                <Label style={styles.labelPadder}>{t('reasons') + ':'}</Label>
                <SearchPicker
                    type='multiple'
                    listItems={[...pickerList]}
                    selectedValues={selectedsReasons.map(({ id }: any) => id)}
                    title='reasons'
                    placeholder='select_reason'
                    isFetching={isFetching}
                    onSelectItemList={(newSelectedValues: any) => {
                        let newSelectedsReasons = reasons.filter(({ id }) => newSelectedValues.includes(id))
                        onValueChange(newSelectedsReasons)
                    }}
                    onChange={(text: string) => {
                        clearTimeout(reasonInputTimer)
                        reasonInputTimer = setTimeout(() => {
                            fetchDatas(text)
                        }, 1000)
                    }}
                />
            </Body>
        </CardItem>
    )
}
export default ReasonInput

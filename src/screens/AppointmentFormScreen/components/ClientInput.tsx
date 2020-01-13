import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { fetchClientsAction } from '../../../actions'
import { clientsSelector } from '../../../selectors/datasetsSelector'
import { Label, CardItem, Body } from 'native-base'
import styles from '../styles'
import SearchPicker from '../../../components/SearchPicker'

var clientInputTimer: any
const ClientInput = ({ onValueChange, selectedValue }: any) => {
    let { t } = useTranslation()
    let dispatch = useDispatch()
    const [isFetching, setIsFetching] = React.useState(false)
    var fetchDatas = async (text = '') => {
        if (text.trim() !== '') {
            await setIsFetching(true)
            dispatch(fetchClientsAction({ searchName: text, onFinishCallback: () => setIsFetching(false) }))
        }
    }
    React.useEffect(() => {
        //fetchDatas()
    }, [])
    let clients = useSelector(clientsSelector)
    let pickerList: Array<any> = []
    pickerList = pickerList.concat(clients.map(({ id, name }) => ({ value: id, label: name })))

    return (
        <CardItem>
            <Body>
                <Label style={styles.labelPadder}>{t('client') + ':'}</Label>
                <SearchPicker
                    listItems={[...pickerList]}
                    selectedValues={[selectedValue]}
                    title='client'
                    placeholder='select_client'
                    isFetching={isFetching}
                    onSelectItemList={(value: any) => onValueChange(value)}
                    onChange={(text: string) => {
                        clearTimeout(clientInputTimer)
                        clientInputTimer = setTimeout(() => {
                            fetchDatas(text)
                        }, 1000)
                    }}
                />
            </Body>
        </CardItem>
    )
}
export default ClientInput

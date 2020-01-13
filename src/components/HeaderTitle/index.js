import React from 'react'
import { Translation } from 'react-i18next'
import { Text } from 'native-base'

const HeaderTitle = ({ trans_id }) => (
    <Translation>{t => <Text style={{ textTransform: 'uppercase', fontWeight: '600', color: 'white' }}>{t(trans_id)}</Text>}</Translation>
)
export default HeaderTitle

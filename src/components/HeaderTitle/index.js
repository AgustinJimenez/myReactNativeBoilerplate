import React from 'react'
import { Translation } from 'react-i18next'
import { Text } from 'native-base'

const HeaderTitle = trans_id => <Translation>{t => <Text>{t(trans_id)}</Text>}</Translation>
export default HeaderTitle

import React from 'react'
import { Card, CardItem, Item, Textarea, Label } from 'native-base'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const TextArea = ({ onChangeValue, label_id, placeholder_id, value, onSubmit }: any) => {
    let { t } = useTranslation()
    //const [value, setValue] = React.useState(initialValue)
    return (
        <React.Fragment>
            <KeyboardAwareScrollView>
                <Card>
                    <CardItem>
                        <Label>{`${t(label_id)}:`}</Label>
                    </CardItem>
                    <CardItem>
                        <Item regular style={{ backgroundColor: 'white' }}>
                            <Textarea
                                onSubmitEditing={event => {
                                    //onSubmit()
                                }}
                                returnKeyType='done'
                                rowSpan={5}
                                style={{ width: '100%' }}
                                placeholder={t(`placeholder_${placeholder_id}`)}
                                defaultValue={value}
                                onChangeText={onChangeValue}
                            />
                        </Item>
                    </CardItem>
                </Card>
            </KeyboardAwareScrollView>
        </React.Fragment>
    )
}
export default TextArea

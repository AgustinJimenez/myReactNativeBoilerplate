import React from 'react'
import { ListItem, Left, Body, Text } from 'native-base'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Select from '../../../components/utils/Select'
import { datasetSelector } from '../../../redux/selectors'
import { setDatasetToReducer } from '../../../redux/actions'
class LangInput extends React.Component {
    state = {
        langs: [
            { label_id: 'english', value: 'en' },
            { label_id: 'spanish', value: 'es' },
        ],
    }

    getSelectedLangLabel = () => {
        let filteredLangs = this.state.langs.filter(({ value }) => value === this.props.lang)

        if (!filteredLangs.length) return null

        return this.props.t(filteredLangs[0].label_id)
    }

    render() {
        return (
            <>
                <ListItem>
                    <Left>
                        <Text>{this.props.t('language') + ':'}</Text>
                    </Left>
                    <Body>
                        <Select
                            iosHeader='select_lang'
                            placeholder={this.getSelectedLangLabel()}
                            selectedValue={this.props.lang}
                            onValueChange={(lang_id: string) => {
                                this.props.setLang(lang_id)
                                this.props.i18n.changeLanguage(lang_id)
                            }}
                            items={this.state.langs.map((lang, key) => ({
                                label: this.props.t(lang.label_id),
                                value: lang.value,
                            }))}
                        />
                    </Body>
                </ListItem>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    lang: datasetSelector(state, 'lang'),
})
const mapDispatchToProps = (dispatch: any) => ({
    setLang: (data: any) => dispatch(setDatasetToReducer(data, 'lang')),
})
LangInput = withTranslation()(LangInput)
export default connect(mapStateToProps, mapDispatchToProps)(LangInput)

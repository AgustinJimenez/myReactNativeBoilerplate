import React from 'react'
import { Picker, ListItem, Left, Body, Text } from 'native-base'
import { connect } from 'react-redux'
import { langSelector, othersSelector } from '../../../selectors/datasetsSelector'
import { setLang } from '../../../actions'
import { withTranslation } from 'react-i18next'
import Select from '../../../components/utils/Select'
class LangInput extends React.Component {
    state = {
        langs: [{ label_id: 'english', value: 'en' }, { label_id: 'spanish', value: 'es' }],
    }

    getSelectedLangLabel = _ => {
        let filteredLangs = this.state.langs.filter(({ value }) => value === this.props.lang.data)

        if (!filteredLangs.length) return null

        return this.props.t(filteredLangs[0].label_id)
    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <Left>
                        <Text>{this.props.t('language') + ':'}</Text>
                    </Left>
                    <Body>
                        <Select
                            iosHeader='select_lang'
                            placeholder={this.getSelectedLangLabel()}
                            selectedValue={this.props.lang.data}
                            onValueChange={lang_id => {
                                this.props.i18n.changeLanguage(lang_id)
                                this.props.setLang(lang_id)
                            }}
                        >
                            {this.state.langs.map((lang, key) => (
                                <Picker.Item key={key} label={this.props.t(lang.label_id)} value={lang.value} />
                            ))}
                        </Select>
                    </Body>
                </ListItem>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    lang: langSelector(state),
    others: othersSelector(state)
})
const mapDispatchToProps = {
    setLang,
}
LangInput = withTranslation()(LangInput)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LangInput)

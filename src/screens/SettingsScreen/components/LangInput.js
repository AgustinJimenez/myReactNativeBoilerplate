import React from 'react'
import { Picker, Icon, ListItem, Left, Body, Text } from 'native-base'
import { connect } from 'react-redux'
import { langSelector } from '../../../selectors/datasetsSelector'
import { setLang } from '../../../actions'
import { withTranslation } from 'react-i18next'

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
            <ListItem>
                <Left>
                    <Text>{this.props.t('language') + ':'}</Text>
                </Left>
                <Body>
                    <Picker
                        mode='dropdown'
                        iosHeader={this.props.t('select_lang')}
                        iosIcon={<Icon name='arrow-down' />}
                        placeholder={this.getSelectedLangLabel()}
                        selectedValue={this.props.lang.data}
                        headerBackButtonText={this.props.t('back')}
                        onValueChange={lang_id => {
                            this.props.i18n.changeLanguage(lang_id)
                            this.props.setLang(lang_id)
                        }}
                    >
                        {this.state.langs.map((lang, key) => (
                            <Picker.Item key={key} label={this.props.t(lang.label_id)} value={lang.value} />
                        ))}
                    </Picker>
                </Body>
            </ListItem>
        )
    }
}

const mapStateToProps = state => ({
    lang: langSelector(state),
})
const mapDispatchToProps = {
    setLang,
}
LangInput = withTranslation()(LangInput)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LangInput)

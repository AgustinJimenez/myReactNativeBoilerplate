import { select, put, takeLatest } from 'redux-saga/effects'
import { langSelector } from '../selectors/datasetsSelector'
import { CHANGE_LANGUAGE_SAGAS } from '../actions/types'
import { setLang } from '../actions'
import showToast from '../utils/showToast'
import i18n from '../app/i18n'

function* changeLanguage({ lang_id, onFinishCallback }: any) {
    yield put(setLang(lang_id))

    let lang = yield select(langSelector)

    i18n.changeLanguage(lang)

    yield showToast(i18n.t('language_changed'), { type: 'success' })
}

export default function* changeLanguageSagas() {
    yield takeLatest(CHANGE_LANGUAGE_SAGAS, changeLanguage)
}

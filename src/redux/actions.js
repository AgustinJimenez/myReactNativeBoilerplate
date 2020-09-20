import {
  SET_ITEM_TO_DATASET_REDUCER
} from './constants.json'
import ListToObjectList from '../helpers/ListToObjectList'

export const setDatasetToReducer = (data, dataset_name) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data,
})

export const setDatasetListToObjectReducer = (data, dataset_name) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data: ListToObjectList(data),
})

export const setHomeActionsPorcentageActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'home_actions_porcentage',
  data,
})

export const setHomeMentalFocusPorcentageActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'home_mental_focus_porcentage',
  data,
})

export const setHabitsActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'habits',
  data,
})

export const setActionHabitsActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'action_habits',
  data,
})

export const setObjectivesActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'objectives',
  data,
})

export const setImemiActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'imei',
  data,
})

export const setTimezoneActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'timezone',
  data,
})

export const setTokenActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'token',
  data,
})

export const setTokenTypeActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'token_type',
  data,
})

export const setQuestionsActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'questions',
  data,
})

export const setAnswersTypesActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'answers_types',
  data,
})

export const setFocusingMediumsActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'focusing_mediums',
  data,
})

export const setUsersPendingQuestionsActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'questions',
  data,
})

export const setIntroTokenActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'intro_token',
  data,
})

export const setCategoriesActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'categories',
  data,
})

export const setCategoriesCompleteActionReducer = data => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name: 'categories_complete',
  data,
})
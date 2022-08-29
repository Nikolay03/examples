import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import { sprintf } from 'sprintf-js'

export const feedbackListAction = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.FEEDBACK_LIST, { params: { ...params } })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: `${ACTION_TYPES.FEEDBACK_LIST}`,
      payload
    })
  }
}

export const feedbackDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.FEEDBACK_DETAIL, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: ACTION_TYPES.FEEDBACK_DELETE
    })
  }
}

export const feedbackCreateAction = feedbackData => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.FEEDBACK_CREATE, feedbackData)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: ACTION_TYPES.FEEDBACK_CREATE
    })
  }
}

export const feedbackDetailAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.FEEDBACK_DETAIL, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: ACTION_TYPES.FEEDBACK_DETAIL
    })
  }
}

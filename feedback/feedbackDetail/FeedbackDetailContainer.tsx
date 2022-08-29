import * as stateNames from 'constants/states'
import React from 'react'
import {
  useDelete,
  useFetchItem
} from 'hooks'
import { TFeedbackItem } from 'types'
import FeedbackDetailPopover from 'containers/feedback/feedbackDetail/components/FeedbackDetailPopover'
import { feedbackDeleteAction, feedbackDetailAction, feedbackListAction } from '../actions'

const FeedbackDetailContainer = () => {
  const data = useFetchItem<TFeedbackItem>({
    action: feedbackDetailAction,
    stateName: stateNames.FEEDBACK_DETAIL
  })
  const deleteData = useDelete({
    stateName: stateNames.FEEDBACK_DELETE,
    action: feedbackDeleteAction,
    successAction: feedbackListAction
  })

  return (
    <FeedbackDetailPopover
      deleteData={deleteData}
      data={data}
    />
  )
}
export default FeedbackDetailContainer

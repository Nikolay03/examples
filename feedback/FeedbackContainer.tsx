import * as stateNames from 'constants/states'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { useCreate, useDelete, useFetchList, useFilterActions } from 'hooks'
import { DEFAULT_PICK_PARAMS } from 'utils/isEquals'
import { fields } from 'containers/feedback/components/FeedbackFilterForm'
import FeedbackDetailContainer from 'containers/feedback/feedbackDetail/FeedbackDetailContainer'
import DetailDrawer from 'components/Drawer/DrawerDetailPopover'
import { feedbackDeleteAction, feedbackListAction } from './actions'
import { FeedbackGrid } from './components'

const PICK_PARAMS = [...DEFAULT_PICK_PARAMS, ...fields]

const FeedbackContainer = (props) => {
  const data = useFetchList({
    action: feedbackListAction,
    stateName: stateNames.FEEDBACK_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.FEEDBACK_DELETE,
    action: feedbackDeleteAction,
    successAction: feedbackListAction
  })

  const filterAction = useFilterActions({ fields })

  return (
    <>
      <FeedbackGrid
        data={data}
        filterAction={filterAction}
        deleteData={deleteData}
      />
      <DetailDrawer closePath={ROUTES.FEEDBACK_URL}>
        <FeedbackDetailContainer {...props}/>
      </DetailDrawer>
    </>

  )
}

export default FeedbackContainer

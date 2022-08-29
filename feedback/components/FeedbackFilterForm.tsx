import * as API from 'constants/api'
import React from 'react'
import { Col, RowMargin } from 'components/UI/Grid'
import {
  Field,
  UniversalSearchField
} from 'components/Form'
import { path, prop } from 'ramda'

export const fields = ['tour', 'stage']
interface Props {
  values?: any
}
const FeedbackFilterForm = ({ values }: Props) => {
  const tourId = path(['tour', 'id'], values) || prop('tour', values)

  return (
    <>
      <RowMargin gutter={20}>
      </RowMargin>
    </>
  )
}

export default FeedbackFilterForm

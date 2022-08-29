import React, { FunctionComponent } from 'react'
import { map, path, pathOr, pipe, prop } from 'ramda'
import { DisplayFlex, FlexBorderBottom, Tag } from 'components/StyledElems'
import {
  LabeledValue,
  DetailDropdown,
  DetailTitle
} from 'components/DetailComponents'
import { DropdownItem } from 'components/UI'
import { TFeedbackItem } from 'types/models'
import { TGetDataFromState, TUseDelete } from 'types'
import { DrawerSkeleton } from 'components/Skeletons'

type Props = {
  data: TGetDataFromState<TFeedbackItem>;
  deleteData: TUseDelete;
};

const FeedbackDetailPopover: FunctionComponent<Props> = props => {
  const { data, deleteData } = props
  const details = prop('data', data)
  const id = prop('id', details)
  const comment = prop('comment', details)
  const phoneNumber = prop('phoneNumber', details)
  const username = prop('username', details)

  return (
    <DrawerSkeleton loading={data.loading}>
      <DisplayFlex justifyContent="space-between">
        <DetailTitle>{username}</DetailTitle>
        <DetailDropdown marginLeft="50px">
          <DropdownItem
            onClick={() => deleteData.onSubmit(id)}
            toggleMenu={() => null}
          >
            Удалить
          </DropdownItem>
        </DetailDropdown>
      </DisplayFlex>
      <FlexBorderBottom justifyContent="space-between">
        <LabeledValue label="Номер телефона" labelMargin={5}>{phoneNumber}</LabeledValue>
      </FlexBorderBottom>
      <FlexBorderBottom justifyContent="space-between">
        <LabeledValue label="Описание" labelMargin={5}>{comment}</LabeledValue>
      </FlexBorderBottom>
    </DrawerSkeleton>
  )
}

export default FeedbackDetailPopover

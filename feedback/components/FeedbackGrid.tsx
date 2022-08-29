import { MENU_KEYS } from 'constants/menus'
import * as ROUTES from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { TGetDataFromState, TData, TFeedbackItem, TUseDelete } from 'types'
import { Menu } from 'components/Menu'
import Pagination from 'components/Pagination'
import {
  Table,
  TableActions,
  TableRow,
  TableHeader,
  TableCol,
  TableBody,
  TableRowLink
} from 'components/Table'
import { Box, Dropdown, DropdownItem } from 'components/UI'
import FeedbackFilterForm from 'containers/feedback/components/FeedbackFilterForm'
import { sprintf } from 'sprintf-js'

type Props = {
  data: TGetDataFromState<TData<TFeedbackItem>>;
  filterAction: any;
  deleteData: TUseDelete
}

const FeedbackGrid: FunctionComponent<Props> = props => {
  const { data, filterAction, deleteData } = props

  const count = pathOr(0, ['data', 'count'], data)
  const list = pathOr<TFeedbackItem[]>([], ['data', 'results'], data)
  const ids = map(prop('id'), list)
  const filterForm = (<FeedbackFilterForm />)
  const actions = (
    <TableActions
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )
  return (
    <div>
      <Menu title="Контакты" module={MENU_KEYS.FEEDBACK} active={MENU_KEYS.FEEDBACK} />
      <Box>
        <Table loading={data.loading} list={ids} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>№</TableCol>
              <TableCol span={1}>ID</TableCol>
              <TableCol span={4}>Имя</TableCol>
              <TableCol span={3}>Номер телефона</TableCol>
              <TableCol span={1} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TFeedbackItem, index) => {
              const id = prop('id', item)
              const phoneNumber = prop('phoneNumber', item)
              const username = prop('username', item)
              return (
                <TableRowLink key={id} link={sprintf(ROUTES.FEEDBACK_DETAIL_URL, id)} align="center">
                  <TableCol span={1}>{index + 1}</TableCol>
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{username}</TableCol>
                  <TableCol span={3}>{phoneNumber}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Удалить
                      </DropdownItem>
                    </Dropdown>
                  </TableCol>
                </TableRowLink>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Pagination count={count} pageSize={25} />
    </div>
  )
}

export default FeedbackGrid

import equal from 'react-fast-compare'
import { getDataFromState, getListParamsFromProps } from 'utils/get'
import { mapResponseToFormError } from 'utils/form'
import { useTypedSelector, usePromiseDispatch } from 'etc/reducers'
import { TGetDataFromState } from 'types'
import { useHistory } from 'react-router-dom'
import { prop } from 'ramda'
import toSnakeCase from '../utils/toSnakeCase'
import useModal from './useModal'

export type TOnSubmit = (action: any) => Promise<void | Pick<any, string | number | symbol>>
type TAction = (params) => (dispatch, store) => Promise<void>;
export type TUseCreateModalParams = {
  key?: string;
  action: TAction;
  successAction?: TAction;
  stateName: string;
  autoClose?: boolean;
  isBoolean?: boolean;
  onSuccess?: (data, values) => void;
  serializer?: (values) => void;
}

export type TUseCreateModal<T extends any> = {
  loading: boolean;
  failed: boolean;
  data: T;
  open: boolean;
  onSubmit: TOnSubmit;
  onOpen: () => void;
  onClose: () => void;
}

export const onOpenModal = ({ value, params, history, onOpen }) => {
  onOpen()
  if (prop('onOpen', params)) {
    params.onOpen(params.key, value, history)
  }
}

export const onCloseModal = ({ onClose, params, history }) => {
  onClose()
  if (params.onClose) {
    params.onClose(params.key, history)
  }
}

const useCreateModal = <T extends any>(params: TUseCreateModalParams): TUseCreateModal<T> => {
  const {
    key = 'createModal',
    action,
    stateName,
    onSuccess,
    isBoolean,
    successAction,
    autoClose,
    serializer = toSnakeCase
  } = params

  const { open, onOpen, onClose } = useModal({ isBoolean, key, autoClose })

  const history = useHistory()

  if (!stateName) {
    throw Error('useCreateModal hook requires stateName!')
  }

  const dispatch = usePromiseDispatch()
  const state = useTypedSelector<TGetDataFromState<T>>(state => getDataFromState(stateName, state), equal)
  const onSubmit = (values: Record<string, any>) => {
    const serializeValues = serializer(values)
    return dispatch(action(serializeValues))
      .then(data => {
        const listParams = getListParamsFromProps({ history })
        if (onSuccess) onSuccess(data, values)
        else if (successAction) dispatch(successAction(listParams))
      })
      .then(() => onClose())
      .catch(mapResponseToFormError)
  }

  return {
    open,
    onOpen,
    onClose,
    onSubmit,
    ...state
  }
}

export default useCreateModal

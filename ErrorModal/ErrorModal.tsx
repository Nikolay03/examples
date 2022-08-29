import { createContext, ReactNode, ReactElement, useCallback, useContext, useReducer } from 'react'
import { AlertCircle } from 'react-feather'
import { Box, Circle, Flex, Stack, useToken } from '@chakra-ui/react'
import { curry, flatten, is, keys, map, pipe, reduce, toPairs } from 'ramda'

import { BACKEND_LOCALE_PREFIX } from '~/locales/backend'
import { TObject } from '~/types/constants'
import hexToRgba from '~/utils/hexToRgba'
import { useTranslate } from '~/utils/translate'
import { ActionTypes, modalReducer } from '~/reducers/modalReducer'
import Modal from '~/components/Modal'

const initialState = {
  isOpen: false,
  errors: {}
}

type TErrorModalContext = {
  onOpen: ({ errors }: { errors: TObject }) => void
  onClose: () => void
}

interface Props {
  children: ReactNode
}

const ErrorContext = createContext<TErrorModalContext>(null)

export function useErrorModal (): TErrorModalContext {
  return useContext(ErrorContext)
}

const mapKeys = curry(function mapKeys (fn, obj) {
  return reduce(function (acc, key) {
    acc[fn(key)] = obj[key]
    return acc
  }, {}, keys(obj))
})

export function ErrorModal (props: Props): ReactElement {
  const { children } = props

  const { t } = useTranslate()

  const [colorRed] = useToken('colors', ['palette.common.red'])
  const [state, dispatch] = useReducer(modalReducer, initialState)

  const onOpen = useCallback((payload) => {
    dispatch({ type: ActionTypes.ACTION_OPEN, payload })
  }, [])

  const onClose = useCallback(() => {
    dispatch({ type: ActionTypes.ACTION_CLOSE })
  }, [])

  function translateObjectDeep (data) {
    if (is(Array, data)) {
      return pipe(map(translateObjectDeep), flatten)(data)
    }

    if (is(Object, data)) {
      return pipe(
        mapKeys(key => t(`${BACKEND_LOCALE_PREFIX}_${key}`) || key),
        map(translateObjectDeep),
        toPairs
      )(data)
    }

    return data
  }

  const title = (
    <Flex align={'center'}>
      <Circle
        bgColor={hexToRgba(colorRed, '0.15')}
        color={colorRed}
        mr={2}
        size={8}>
        <AlertCircle size={22} />
      </Circle>
      Error
    </Flex>
  )

  const errors = translateObjectDeep(state.errors) || []

  return (
    <ErrorContext.Provider value={{ onOpen, onClose }}>
      {children}

      <Modal
        title={title}
        isOpen={state.isOpen}
        onClose={onClose}>
        <Box
          bgColor={'gray.100'}
          borderColor={'gray.200'}
          borderWidth={1}
          fontWeight={'normal'}
          borderRadius={'md'}
          p={4}>
          <Stack spacing={4}>
            {errors.map((item, index) => {
              const [key, message] = item

              return (
                <Box key={index}>
                  <Box as={'span'} fontWeight={'medium'}>{key}</Box>: {message}
                </Box>
              )
            })}
          </Stack>
        </Box>
      </Modal>
    </ErrorContext.Provider>
  )
}

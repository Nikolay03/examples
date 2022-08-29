import { ReactElement } from 'react'
import { IndicatorProps } from 'react-select'
import { omit } from 'ramda'
import { X } from 'react-feather'
import { Center, Icon } from '@chakra-ui/react'

export default function MultiValueRemove (props: IndicatorProps<any, any>): ReactElement {
  const { innerProps } = props
  const restInnerProps = omit(['className'], innerProps)

  return (
    <Center
      {...restInnerProps}
      cursor={'pointer'}
      px={1}
      _hover={{ bgColor: 'gray.100' }}
      _active={{ bgColor: 'gray.200' }}>
      <Icon as={X} color={'gray.500'} />
    </Center>
  )
}

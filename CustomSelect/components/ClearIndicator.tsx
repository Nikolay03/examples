import { ReactElement } from 'react'
import { components, IndicatorProps } from 'react-select'
import { X } from 'react-feather'
import { Icon } from '@chakra-ui/react'

export default function ClearIndicator (props: IndicatorProps<any, any>): ReactElement {
  return (
    <components.ClearIndicator {...props}>
      <Icon as={X} />
    </components.ClearIndicator>
  )
}

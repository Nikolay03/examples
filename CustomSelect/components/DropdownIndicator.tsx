import { ReactElement } from 'react'
import { components, IndicatorProps } from 'react-select'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Icon } from '@chakra-ui/react'

export default function DropdownIndicator (props: IndicatorProps<any, any>): ReactElement {
  const { selectProps } = props
  const { menuIsOpen } = selectProps

  return (
    <components.DropdownIndicator {...props}>
      <Icon as={menuIsOpen ? ChevronUp : ChevronDown} />
    </components.DropdownIndicator>
  )
}

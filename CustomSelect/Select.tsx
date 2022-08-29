import { ReactElement, Ref } from 'react'
import { path } from 'ramda'
import ReactSelect, { Props as RSProps } from 'react-select'

import useSelectCommonProps from './useSelectCommonProps'

import { TSelectListItem } from '~/types/constants'

interface Props extends RSProps<TSelectListItem, false> {
  innerRef: Ref<any>
  isInvalid?: boolean
  size?: string
  variant?: string
}

function Select (props: Props): ReactElement {
  const { components, innerRef, isInvalid, placeholder, size, variant, ...restProps } = props

  const commonProps = useSelectCommonProps({
    size,
    variant,
    isInvalid,
    placeholder,
    components
  })

  return (
    // @ts-ignore
    <ReactSelect<TSelectListItem>
      getOptionValue={path(['id'])}
      getOptionLabel={path(['name'])}
      inputId={'select'}
      isClearable={true}
      openMenuOnFocus={true}
      ref={innerRef}
      {...commonProps}
      {...restProps}
    />
  )
}

Select.defaultProps = {
  size: 'md',
  variant: 'filled'
}

export default Select

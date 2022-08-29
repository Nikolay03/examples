import { ReactElement, Ref } from 'react'
import { path } from 'ramda'
import { Props as RSProps } from 'react-select'
import Select from 'react-select/async'

import useSelectCommonProps from './useSelectCommonProps'

interface Props<Option> extends RSProps<Option> {
  innerRef: Ref<any>
  isInvalid?: boolean
  size?: string
  variant?: string
}

function AsyncSelect<Option> (props: Props<Option>): ReactElement {
  const { components, innerRef, isInvalid, placeholder, size, variant, ...restProps } = props

  const commonProps = useSelectCommonProps({
    size,
    variant,
    isInvalid,
    placeholder,
    components
  })
  // useEffect(() => {
  //   function loadOption (id) {
  //     return request.get(`${api}${id}/`)
  //       .then(prop('data'))
  //       .catch(console.warn)
  //   }
  //
  //   if (valueId) {
  //     loadOption(valueId)
  //       .then((item: Option) => {
  //         const option = {
  //           id: getValue(item),
  //           name: getLabel(item)
  //         }
  //
  //         const newOptions = uniqBy(prop('id'), [option, ...options])
  //         setOptions(newOptions)
  //       })
  //   }
  // }, [valueId])

  return (
    // @ts-ignore
    <Select<Option>
      cacheOptions={true}
      defaultOptions={true}
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

AsyncSelect.defaultProps = {
  size: 'md'
}

export default AsyncSelect

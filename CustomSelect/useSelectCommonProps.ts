import { ReactNode } from 'react'
import { SelectComponentsConfig, Styles } from 'react-select'

import useSelectMessages, { UseSelectMessages } from './useSelectMessages'
import useSelectStyles from './useSelectStyles'
import useSelectTheme, { UseSelectTheme } from './useSelectTheme'
import defaultComponents from './components'

interface UseSelectCommonPropsOptions {
  components: SelectComponentsConfig<any, any>
  isInvalid: boolean
  placeholder: ReactNode | undefined
  size: string
  variant: string
}

interface UseSelectCommonProps extends UseSelectMessages {
  components: SelectComponentsConfig<any, any>
  placeholder: ReactNode | null
  styles: Styles<any, any>
  theme: UseSelectTheme
}

export default function useSelectCommonProps (options: UseSelectCommonPropsOptions): UseSelectCommonProps {
  const { components, isInvalid, placeholder, size, variant } = options

  const { loadingMessage, noOptionsMessage } = useSelectMessages()

  const styles = useSelectStyles({ size, isInvalid, variant })

  const getTheme = useSelectTheme({ size })

  const formedComponents = { ...components, ...defaultComponents }
  const formedPlaceholder = placeholder || null

  return {
    components: formedComponents,
    loadingMessage,
    noOptionsMessage,
    placeholder: formedPlaceholder,
    styles,
    theme: getTheme
  }
}

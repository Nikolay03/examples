import { mapObjIndexed, path, pipe, prop } from 'ramda'
import { useTheme, ThemeComponents, ChakraTheme } from '@chakra-ui/react'

import { TObject } from '~/types/constants'

export default function useInputSizes (): TObject {
  const theme: ChakraTheme = useTheme()
  const components: ThemeComponents = theme.components

  return pipe(
    path(['Input', 'sizes']),
    mapObjIndexed(prop('field'))
  )(components)
}

import { path, prop } from 'ramda'
import { Theme } from 'react-select'
import { useTheme } from '@chakra-ui/react'

import useInputSizes from './useInputSizes'

import hexToRgba from '~/utils/hexToRgba'

interface UseSelectThemeOptions {
  size: string
  variant?: string
}

export type UseSelectTheme = (theme) => Theme

export default function useSelectTheme ({ size }: UseSelectThemeOptions): UseSelectTheme {
  const { colors, radii } = useTheme()
  const inputSizes = useInputSizes()

  const primary = colors.primary[500]
  const primary25 = colors.primary[200]
  const primary50 = colors.primary[300]
  const primary75 = colors.primary[400]

  const neutral0 = colors.white
  const neutral5 = colors.gray[50]
  const neutral10 = colors.gray[100]
  const neutral20 = colors.gray[200]
  const neutral30 = colors.gray[300]
  const neutral40 = colors.gray[400]
  const neutral50 = colors.gray[500]
  const neutral60 = colors.gray[600]
  const neutral70 = colors.gray[700]
  const neutral80 = colors.gray[800]
  const neutral90 = colors.gray[900]

  return function getTheme (selectTheme) {
    const borderRadius = prop(path<string>([size, 'borderRadius'], inputSizes), radii)
    const controlHeight = path<string>([size, 'h'], inputSizes)

    return {
      ...selectTheme,
      borderRadius,
      colors: {
        ...selectTheme.colors,
        danger: colors.palette.common.red,
        dangerLight: hexToRgba(colors.palette.common.red, '0.7'),

        primary,
        primary25,
        primary50,
        primary75,

        neutral0,
        neutral5,
        neutral10,
        neutral20,
        neutral30,
        neutral40,
        neutral50,
        neutral60,
        neutral70,
        neutral80,
        neutral90
      },
      spacing: {
        ...selectTheme.spacing,
        controlHeight
      }
    }
  }
}

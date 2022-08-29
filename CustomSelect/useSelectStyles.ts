import { path } from 'ramda'
import { Styles } from 'react-select'
import { useTheme } from '@chakra-ui/react'

import useInputSizes from './useInputSizes'

interface UseSelectStylesOptions {
  size: string
  isInvalid: boolean,
  variant: string
}

export default function useSelectStyles (options: UseSelectStylesOptions): Styles<any, any> {
  const { size, isInvalid, variant } = options

  const { colors, ...theme } = useTheme()
  const inputSizes = useInputSizes()

  const transition = 'all 200ms'

  const control = (provided, state) => {
    const controlVariants = {
      outline: {
        bgColor: state.theme.colors.neutral0,
        bgColorHover: state.theme.colors.neutral0,
        bgColorFocus: state.theme.colors.neutral0,
        borderColorHover: state.theme.colors.primary
      },
      filled: {
        bgColor: state.theme.colors.neutral10,
        bgColorHover: state.theme.colors.neutral20,
        bgColorFocus: state.theme.colors.neutral0,
        borderColorHover: 'transparent'
      }
    }

    const bgColor = controlVariants[variant].bgColor
    const bgColorHover = controlVariants[variant].bgColorHover
    const bgColorFocus = controlVariants[variant].bgColorFocus

    return {
      ...provided,
      backgroundColor: state.isFocused ? bgColorFocus : bgColor,
      borderColor: isInvalid
        ? state.theme.colors.danger
        : state.isFocused
          ? state.theme.colors.primary
          : colors.transparent,
      boxShadow: isInvalid
        ? `0 0 0 1px ${state.theme.colors.danger}`
        : state.isFocused
          ? `0 0 0 1px ${state.theme.colors.primary}`
          : null,
      borderRadius: state.theme.borderRadius,
      transition,
      '&:hover': {
        backgroundColor: state.isFocused ? bgColorFocus : bgColorHover,
        borderColor: isInvalid
          ? state.theme.colors.danger
          : state.isFocused
            ? state.theme.colors.primary
            : colors.transparent
      }
    }
  }

  const clearIndicator = (provided, state) => ({
    ...provided,
    color: colors.palette.common.darkGray,
    '&:hover': {
      color: state.theme.colors.neutral80
    }
  })

  const dropdownIndicator = (provided, state) => {
    const sidePaddingValue = path<string>([size, 'px'], inputSizes)
    const sidePaddingFormed = theme.space[sidePaddingValue]
    const padding = `8px ${sidePaddingFormed} 8px 8px`

    return {
      ...provided,
      alignItems: 'center',
      color: state.isFocused
        ? isInvalid
          ? state.theme.colors.danger
          : state.theme.colors.primary
        : colors.palette.common.darkGray,
      padding,
      pointerEvents: 'none'
    }
  }

  const indicatorSeparator = () => ({})

  const indicatorsContainer = (provided) => ({
    ...provided,
    padding: `0 ${theme.space[2]}`
  })

  const placeholder = (provided, state) => ({
    ...provided,
    color: state.theme.colors.neutral50,
    marginLeft: 0,
    marginRight: 0
  })

  const input = provided => ({
    ...provided,
    color: colors.palette.text.default,
    '& input': {
      fontWeight: 'inherit'
    }
  })

  const menu = (provided, state) => {
    const backgroundColor = state.theme.colors.neutral0
    const borderColor = state.theme.colors.neutral20

    return {
      ...provided,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      boxShadow: theme.shadows.md,
      borderRadius: state.theme.borderRadius
      // minWidth: '300px'
    }
  }

  const menuList = provided => ({
    ...provided,
    padding: theme.space[2]
  })

  const menuPortal = provided => ({
    ...provided,
    zIndex: 2000
  })

  const option = (provided, state) => {
    const backgroundColor = colors.transparent
    const backgroundColorSelected = state.theme.colors.neutral30
    const backgroundColorActive = state.theme.colors.neutral20
    const backgroundColorHover = state.theme.colors.neutral10

    return {
      ...provided,
      backgroundColor: state.isSelected ? backgroundColorSelected : backgroundColor,
      borderRadius: state.theme.borderRadius,
      color: 'inherit',
      cursor: 'pointer',
      transition,
      '&:active': {
        backgroundColor: backgroundColorActive
      },
      ':focus': {
        backgroundColor: backgroundColorHover
      },
      '&:hover:not(:active)': {
        backgroundColor: state.isSelected ? backgroundColorSelected : backgroundColorHover
      }
    }
  }

  const singleValue = provided => ({
    ...provided,
    fontSize: 'inherit',
    color: 'inherit'
  })

  const multiValue = (provided, state) => ({
    ...provided,
    backgroundColor: state.theme.colors.neutral0,
    borderRadius: theme.radii.base,
    fontSize: theme.fontSizes.sm,
    overflow: 'hidden'
  })

  const valueContainer = (provided) => {
    const paddingValue = path<string>([size, 'px'], inputSizes)
    const sidePadding = `calc(${theme.space[paddingValue]} - 2px)`

    return {
      ...provided,
      padding: `2px ${sidePadding}`
    }
  }

  return {
    control,
    clearIndicator,
    dropdownIndicator,
    indicatorsContainer,
    indicatorSeparator,
    placeholder,
    input,
    menu,
    menuList,
    menuPortal,
    option,
    singleValue,
    multiValue,
    valueContainer
  }
}

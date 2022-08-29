import { ReactElement } from 'react'
import { MultiValueProps } from 'react-select'
import { Box } from '@chakra-ui/react'

export default function MultiValueLabel (props: MultiValueProps<any>): ReactElement {
  const { children } = props

  return (
    <Box
      textOverflow={'ellipsis'}
      overflow={'hidden'}
      pl={2}
      py={1}
      whiteSpace={'nowrap'}>
      {children}
    </Box>
  )
}

import { ReactElement } from 'react'
import { map, range } from 'ramda'
import { Skeleton, Stack } from '@chakra-ui/react'

export default function CategoriesSkeleton (): ReactElement {
  return (
    <Stack px={8} py={6} spacing={4}>
      {map(item => <Skeleton key={item} h={5} />, range(0, 4))}
    </Stack>
  )
}

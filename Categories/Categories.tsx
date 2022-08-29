import { Children, ReactElement, ReactNodeArray } from 'react'
import {Box, BoxProps, Center, Heading} from '@chakra-ui/react'
import { isEmpty } from 'ramda'

import CategoryItem from './CategoryItem'
import CategoriesSkeleton from './CategoriesSkeleton'
import useCategories from './useCategories'

import { useTranslate } from '~/utils/translate'

interface CategoriesListProps {
  children: ReactNodeArray
  list: ReactNodeArray
  isLoading: boolean
}

function CategoriesList (props: CategoriesListProps) {
  const { children, isLoading, list } = props

  const { t } = useTranslate()

  if (isLoading) {
    return (
      <CategoriesSkeleton />
    )
  }

  if (isEmpty(list)) {
    return (
      <Box px={4} py={6}>
        <Center>
          {t('table_no_data')}
        </Center>
      </Box>
    )
  }

  return (
    <Box pt={6} px={4} pb={4}>
      {children}
    </Box>
  )
}

interface CategoriesProps {
  children: ReactNodeArray
  isLoading: boolean
  allServicesLabel?: string
  queryKey?: string
  categoryTitle?: string
  allCount?: number,
  boxProps?: BoxProps
}

export default function Categories (props: CategoriesProps): ReactElement {
  const { children, allServicesLabel, queryKey, categoryTitle, allCount, isLoading, boxProps } = props

  const { t } = useTranslate()

  const { activeCategory, onSelectCategory } = useCategories(queryKey)

  const arrayChildren = Children.toArray(children)

  return (
    <Box
      alignSelf={'baseline'}
      bgColor={'gray.100'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      w={'full'}
      {...boxProps}
    >
      <Box borderBottomWidth={1} borderColor={'gray.200'} p={6}>
        <Heading as={'h3'} fontSize={'md'} fontWeight={'bold'}>
          {categoryTitle || t('common_choose_category')}
        </Heading>
      </Box>

      <CategoriesList list={arrayChildren} isLoading={isLoading}>
        {allServicesLabel && (
          <CategoryItem
            count={allCount}
            isActive={!activeCategory}
            onClick={onSelectCategory.bind(null, undefined)}>
            {allServicesLabel}
          </CategoryItem>
        )}
        {children}
      </CategoriesList>
    </Box>
  )
}

import { ReactElement } from 'react'
import { prop } from 'ramda'

import { SERVICE_CATEGORY_LIST } from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { Categories, CategoryItem, useCategories, useFetchCategories } from '~/components/Categories'
import { TServiceCategory } from '~/types/services'

interface Props {
  allCount: number
  onSuccess: (data) => void
}

export default function ServicesCategories (props: Props): ReactElement {
  const { allCount, onSuccess } = props

  const { t, translateData } = useTranslate()

  const { activeCategory, onSelectCategory } = useCategories()

  const { isLoading, results } = useFetchCategories<TServiceCategory>(SERVICE_CATEGORY_LIST, {
    onSuccess,
    disableLocale: true
  })

  return (
    <Categories
      allCount={allCount}
      allServicesLabel={t('services_categories_all')}
      isLoading={isLoading}>
      {results.map(category => {
        const id = String(prop('id', category))
        const name = translateData(category, 'name')
        const count = prop('serviceCount', category)
        const isActive = id === activeCategory

        return (
          <CategoryItem
            key={id}
            count={count}
            isActive={isActive}
            onClick={onSelectCategory.bind(null, id)}>
            {name}
          </CategoryItem>
        )
      })}
    </Categories>
  )
}

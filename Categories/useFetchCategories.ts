import { SWRConfiguration } from 'swr'

import { useRequest } from '~/hooks/api'

interface UseFetchCategoriesConfig extends SWRConfiguration {
  disableLocale?: boolean
}

interface UseFetchCategories<T> {
  results: T[]
  isLoading: boolean
}

export default function useFetchCategories<T> (api: string, config?: UseFetchCategoriesConfig): UseFetchCategories<T> {
  const { results, isLoading } = useRequest<T>(api, {
    disableLocale: false,
    disableUrlParams: true,
    params: { pageSize: 100, withCount: true },
    ...config
  })

  return {
    results,
    isLoading
  }
}

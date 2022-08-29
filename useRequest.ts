import { useState, useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { useRouter } from 'next/router'

import { TObject } from '~/types/constants'
import { TUseRequest } from '~/types/hooks'
import { getListData } from '~/utils/fetch'
import { TStateListData } from '~/types/state'
import { fetcher } from '~/utils/swr'
import { useRouterQuery } from '~/hooks/url'

interface UseRequestOptions<T> extends SWRConfiguration<TStateListData<T>> {
  disableUrlParams?: boolean
  disableLocale?: boolean
  params?: TObject
}

interface UseRequest<T> extends TUseRequest<T> {
  data?: TStateListData<T> & TObject
}

export default function useRequest<T> (api: string, options: UseRequestOptions<T> = {}): UseRequest<T> {
  const {
    initialData,
    disableUrlParams,
    disableLocale = true,
    params = {},
    ...restOptions
  } = options

  const { locale: language } = useRouter()

  const { urlQuery } = useRouterQuery()

  const [isLoading, setIsLoading] = useState(false)

  const initialParams = disableLocale ? { ...params } : { ...params, language }
  const allParams = disableUrlParams ? initialParams : { ...urlQuery, ...initialParams }
  const stringParams = JSON.stringify(allParams)

  const memoParams = useMemo(() => allParams, [stringParams])

  const { data, error, isValidating, mutate } = useSWR<TStateListData<T>>([api, memoParams], fetcher, {
    initialData,
    revalidateOnFocus: false,
    ...restOptions
  })
  function refetch (newParams: TObject, newApi?: string) {
    setIsLoading(true)
    return mutate(async () => await fetcher(newApi || api, newParams), false)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }

  const listData = getListData<T>(data, error)

  return {
    ...listData,
    data,
    refetch,
    isLoading: isValidating || isLoading
  }
}

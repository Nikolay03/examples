import { useRouter } from 'next/router'

import { useRouterQuery } from '~/hooks/url'

interface UseCategories {
  activeCategory: string | null
  onSelectCategory: (id: number | undefined) => Promise<boolean>
}

function useCategories (queryKey = 'category'): UseCategories {
  const router = useRouter()

  const { routerQuery, urlQuery } = useRouterQuery()

  const { [queryKey]: queryCategory } = urlQuery

  function onSelectCategory (id: number | undefined) {
    return router.replace({
      pathname: router.pathname,
      query: { ...routerQuery, [queryKey]: id }
    }, null, { shallow: true })
  }

  return {
    activeCategory: queryCategory,
    onSelectCategory
  }
}

export default useCategories

import { useTranslate } from '~/utils/translate'

type NoOptionsMessageParams = { inputValue: string }

export interface UseSelectMessages {
  loadingMessage: () => string
  noOptionsMessage: ({ inputValue }: NoOptionsMessageParams) => string
}

export default function useSelectMessages (): UseSelectMessages {
  const { t } = useTranslate()

  function loadingMessage () {
    return t('select_loading_message')
  }

  function noOptionsMessage ({ inputValue }) {
    if (inputValue) {
      return t('select_not_found_message_with_text', {
        text: inputValue
      })
    }
    return t('select_not_found_message')
  }

  return {
    loadingMessage,
    noOptionsMessage
  }
}

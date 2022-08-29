import { path, prop } from 'ramda'

export const feedbackCreateSerializer = params => {
  const user = path(['user', 'id'], params)
  const stage = path(['stage', 'id'], params)

  return {
    stage: stage,
    user: user,
  }
}

export const feedbackDeleteSerializer = params => {
  return {
    ...params
  }
}

import * as types from '../constants/ActionTypes'

const getNewState = () => (new Array(7 * 24)).fill(false)
const initialState = getNewState()

export default function (state = initialState, action) {
  switch (action.type) {
    case types.MARK_HOUR:
      return state.map((hour, i) => action.i == i ? true : hour)

    case types.UNMARK_HOUR:
      return state.map((hour, i) => action.i == i ? false : hour)

    case types.MARK_DAY:
      return state.map((hour, i) => {
        if (i >= action.i * 24 && i < action.i * 24 + 24) {
          return true
        } else {
          return hour
        }
      })

    case types.UNMARK_DAY:
      return state.map((hour, i) => {
        if (i >= action.i * 24 && i < action.i * 24 + 24) {
          return false
        } else {
          return hour
        }
      })

    case types.CLEAR_ALL:
      return getNewState()

    case types.LOAD_STATE:
      return action.state

    default:
      return state
  }
}

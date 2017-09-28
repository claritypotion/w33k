import * as types from '../constants/ActionTypes'
import { decode } from '../transport/transport'

export const markHour = i => ({ type: types.MARK_HOUR, i: i })
export const unmarkHour = i => ({ type: types.UNMARK_HOUR, i: i })
export const markDay = i => ({ type: types.MARK_DAY, i: i })
export const unmarkDay = i => ({ type: types.UNMARK_DAY, i: i })
export const clearAll = () => ({ type: types.CLEAR_ALL })
export const loadState = () => ({ type: types.LOAD_STATE, state: decode() })

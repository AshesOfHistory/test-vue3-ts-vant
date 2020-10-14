import { Module } from 'vuex'
import { IGlobalState } from '../index'
import { CATEGORY_TYPES, ISlider, IHomeState, ILesson } from '@/typings'
import * as Types from '../action-types'
import { getSliders } from '@/api/home'

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    loading: false,
    hasMore: false,
    offset: 0,
    limit: 5,
    list: []
  },
}
// selfState   globalState
export const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
      state.currentCategory = payload
    },
    [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
      state.sliders = payload
    },
    [Types.SET_LESSON_LIST](state, payload: ILesson[]) {
      state.lessons.list = payload
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      let sliders = await getSliders<ISlider>()
      commit(Types.SET_SLIDER_LIST, sliders)
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      if (state.lessons.loading) {
        return
      }
      if (!state.lessons.hasMore) {
        return
      }
      commit(Types.SET_LESSON_LIST)
    }
  }
}
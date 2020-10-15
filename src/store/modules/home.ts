import { Module } from 'vuex'
import { IGlobalState } from '../index'
import { CATEGORY_TYPES, ISlider, IHomeState, ILessons } from '@/typings'
import * as Types from '../action-types'
import { getLessons, getSliders } from '@/api/home'

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    loading: false,
    hasMore: true,
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
    [Types.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload
    },
    [Types.SET_LESSON_LIST](state, payload: ILessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore
      state.lessons.offset = state.lessons.offset + payload.list.length
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      let sliders = await getSliders<ISlider>()
      commit(Types.SET_SLIDER_LIST, sliders)
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      // 仅当loading完毕 且 拥有更多数据的时候才会触发
      if (state.lessons.loading) {
        return
      }
      if (!state.lessons.hasMore) {
        return
      }
      commit(Types.SET_LOADING, true) // 开始加载数据
      console.log('getLessonList here')
      // 获取列表数据
      let lessons = await getLessons<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit)

      commit(Types.SET_LESSON_LIST, lessons)
      commit(Types.SET_LOADING, false)
    }
  }
}
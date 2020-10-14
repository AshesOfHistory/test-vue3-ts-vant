import { IHomeState } from '@/typings'
import { createStore } from 'vuex'
import {home} from './modules/home'

export interface IGlobalState {
  home: IHomeState, // 页面模块在这边添加
}

const store = createStore<IGlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    home
  }
})
export default store

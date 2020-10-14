import axios from './index'
import {CATEGORY_TYPES, ILesson} from '@/typings'

export function getSliders<T>() {
  return axios.get<T, T>('/slider/list')
}

export function getLessons<T>(category: CATEGORY_TYPES, offset: number = 0, limit: number = 5, list: ILesson[]) {
  return axios.get<T, T>(`/lesson/list?category=${category}&limit=${limit}`)
}
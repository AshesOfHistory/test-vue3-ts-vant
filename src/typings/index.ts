export enum CATEGORY_TYPES {
  ALL,
  VUE,
  REACT,
  NODE
}

export interface ISlider {
  url: string
}

export interface ILesson {
  title: string,
  video: string,
  poster: string,
  price: number,
  category?: string
}

export type ILessons = {
  loading: boolean,
  hasMore: boolean,
  list: ILesson[],
  limit: number,
  offset: number
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES,
  sliders: ISlider[],
  lessons: ILessons,
}
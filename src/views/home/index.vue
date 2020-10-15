<template>
  <div>
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
    ></HomeHeader>

    <div class="home-container">
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </div>

    <HomeList :lessonList="lessonList"></HomeList>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from "@/typings";
import { IGlobalState } from "@/store";
import HomeList from "./homeList.vue";
import HomeSwiper from "./homeSwiper.vue";
import HomeHeader from "./homeHeader.vue";
import { useStore, Store } from "vuex";
import { defineComponent, computed, onMounted } from "vue";
import * as Types from "@/store/action-types";

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory);
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory,
  };
}

function useLessonList(store: Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list);
  onMounted(() => {
    // 注意这边的computed返回的是响应式数据，需要.value才能拿到数据
    if (lessonList.value.length === 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`);
    }
  });
  return {
    lessonList
  }
}

export default defineComponent({
  components: {
    HomeList,
    HomeSwiper,
    HomeHeader,
  },
  setup() {
    // 获取store
    let store = useStore<IGlobalState>();
    // 使用自定义钩子函数获取分类
    let { category, setCurrentCategory } = useCategory(store);
    // 使用自定义钩子函数获取课程数据
    let { lessonList } = useLessonList(store)
    return {
      category,
      setCurrentCategory,
      lessonList
    };
  },
});
</script>


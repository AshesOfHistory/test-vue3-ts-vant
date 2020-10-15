<template>
  <div>
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
    ></HomeHeader>

    <div class="home-container" ref="homeRef">
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback> loading... </template>
      </Suspense>

      <div ref="refreshElm">
        <HomeList :lessonList="lessonList" class="list-container" ></HomeList>
      </div>
      
      <div v-if="isLoading" class="tips" >正在加载中...</div>
      <div v-if="!hasMore" class="tips">我是有底线的...</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  height: calc(100vh - 230px);
  width: 100vw;
  overflow: scroll;
}
.tips{
  font-size: 12px;
}
</style>

<script lang="ts">
import { CATEGORY_TYPES } from "@/typings";
import { IGlobalState } from "@/store";
import HomeList from "./homeList.vue";
import HomeSwiper from "./homeSwiper.vue";
import HomeHeader from "./homeHeader.vue";
import { useStore, Store } from "vuex";
import { defineComponent, computed, onMounted, ref } from "vue";
import * as Types from "@/store/action-types";
import { useLoadMore } from "@/hooks/useLoadMore";

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
    lessonList,
  };
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
    let { lessonList } = useLessonList(store);

    // 获取列表container的dom
    let refreshElm = ref<null | HTMLElement>(null);
    let { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );
    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore
    };
  },
});
</script>


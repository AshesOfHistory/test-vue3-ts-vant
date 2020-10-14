<template>
  <div>
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory"></HomeHeader>
    
    <div class="home-container">
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback>
          loading...
        </template>
      </Suspense>
    </div>

    <HomeList></HomeList>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from "@/typings";
import { IGlobalState } from "@/store";
import HomeList from "./homeList.vue";
import HomeSwiper from "./homeSwiper.vue";
import HomeHeader from "./homeHeader.vue";
import { useStore, Store } from "vuex";
import { defineComponent, computed } from "vue";
import * as Types from "@/store/action-types";

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory);
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory
  };
}

function useLessonList(store: Store<IGlobalState>) {}

export default defineComponent({
  components: {
    HomeList,
    HomeSwiper,
    HomeHeader
  },
  setup() {
    let store = useStore<IGlobalState>();
    let { category, setCurrentCategory } = useCategory(store);
    return {
      category,
      setCurrentCategory
    };
  }
});
</script>


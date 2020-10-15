<template>
<div>
  <van-swipe v-if="slideList.length" :autoplay="3000" class="my-swipe" indicator-color="white">
    <van-swipe-item v-for="slide in slideList" :key="slide.url">
      <img :src="slide.url" alt="" style="width: 100%;height: 100px;">
    </van-swipe-item>
  </van-swipe>
</div>
</template>

<style lang="scss">
.my-swipe .van-swipe-item {
  margin-top: 10px;
  
}
</style>


<script lang="ts">
import {defineComponent, computed} from 'vue'
import { useStore } from 'vuex';
import { IGlobalState } from '@/store';
import * as Types from '@/store/action-types'
export default defineComponent({
  async setup() {
    let store = useStore<IGlobalState>()
    let slideList = computed(() => store.state.home.sliders)
    if (slideList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }
    return {slideList}
  }
})
</script>


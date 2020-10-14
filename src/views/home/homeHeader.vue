<template>
  <div class="home-header">
    <van-dropdown-menu>
      <!-- 为了同时双向绑定多个属性  使用modelValue作为绑定值 -->
      <van-dropdown-item :modelValue='category' :options='options' @change="change"></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<style lang="scss" scoped>
  .home-header {
    height: 50px;
    width: 100%;
    background-image: url('../../assets/header.jpg');
    img {
      width: 100%;
      height: 50px;
    }
    ::v-deep .van-dropdown-menu{
      position: absolute;
      right: 0;
      width: 25%;
      height: 50px;
      font-size: 12px;
      .van-dropdown-menu__title{
        color: #fff;
      }
      .van-dropdown-menu__title{
        background: #323233;
      }
    }
  }
</style>


<script lang="ts">
import {CATEGORY_TYPES} from '@/typings';
import {defineComponent, PropType, reactive, toRefs} from 'vue'
export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>
    },
  },
  emits: ["setCurrentCategory"], // 为了在setup里面写触发事件的时候 提示方法名
  setup(props, context) {
    let state = reactive({
      options: [
        {text: '全部课程', value: CATEGORY_TYPES.ALL},
        {text: 'react课程', value: CATEGORY_TYPES.REACT},
        {text: 'vue课程', value: CATEGORY_TYPES.VUE},
        {text: 'node课程', value: CATEGORY_TYPES.NODE},
      ]
    })
    function change(value: CATEGORY_TYPES) {
      context.emit("setCurrentCategory", value)
    }
    return {
      ...toRefs(state),
      change
    }
  }
})
</script>
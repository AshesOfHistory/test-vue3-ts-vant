import { IGlobalState } from '@/store';
import {computed, onMounted, Ref} from 'vue';
import { Store } from 'vuex';
import _ from 'lodash'
export function useLoadMore(domEl: Ref<null | HTMLElement>, store: Store<IGlobalState>, dispatchType: string) {
  // 防抖  进阶手写
  let element: HTMLElement;

  function _loadMore() {
    // 整个list高度 卷曲高度 获取可视区域高度  
    let containHeight = element.clientHeight;
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    if (containHeight + scrollTop + 20 >= scrollHeight) { // 距离底部高度还有20px的时候触发vuex中home子模块dispatch的SET_LESSON_LIST函数
      store.dispatch(dispatchType)
    }
  }

  onMounted(() => {
    // 由于自定义组件直接写ref获取不到dom，所以需要在自定义的组件外面包裹一层div用来获取dom元素
    // domEl是ref类型的数据，所以获取值的时候需要用.value获取，children[0]才是我们真正要监听的元素
    // 使用as 类型断言 因为在mounted的阶段时dom元素已经渲染完毕，一定是html元素
    element = domEl.value?.children[0] as HTMLElement;
    // 使用lodash的防抖方法避免短时间内重复触发
    element.addEventListener('scroll', _.debounce(_loadMore, 200))
  })

  // store实时获取最新的loading以及hasMore状态
  const isLoading = computed(() => store.state.home.lessons.loading)
  const hasMore = computed(() => store.state.home.lessons.hasMore)

  return {
    isLoading,
    hasMore
  }
}
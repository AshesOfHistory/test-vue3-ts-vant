<template>
  <div id="nav">
    <!-- vue3中keepalice缓存写法 -->
    <!-- <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component"></component> 
      </keep-alive>
    </router-view> -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to='/' icon='home-o'>主页</van-tabbar-item>
      <van-tabbar-item to='/lessons' icon='orders-o'>课程</van-tabbar-item>
      <van-tabbar-item to='/mine' icon='manager-o'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
}
</style>

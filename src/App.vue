<template>
  <StarBg>
    <div class="container">
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/personal">个人信息</router-link>
        <router-link to="/works">作品集</router-link>
        <router-link to="/notes">随笔日志</router-link>
      </nav>
      <n-message-provider>
      <router-view />
      </n-message-provider>
    </div>
  </StarBg>
</template>
<script setup>
import StarBg from '@/components/StarBg.vue'
</script>
<style scoped>
.nav {
  display: flex;
  gap: 32px;
  padding: 24px;
  justify-content: center;
  a {
    color: #eef4ff;
    text-decoration: none;
    font-size:17px;
    &:hover {
      color:#8b7cf2;
    }
  }
}
</style>
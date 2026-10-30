<template>
  <div class="personal-page">
    <div class="container">
      <div class="header">
        <h2>个人信息</h2>
        <n-button v-if="!isEdit" type="primary" @click="isEdit = true">编辑信息</n-button>
        <div v-else class="btn-group">
          <n-button type="primary" @click="saveInfo">保存</n-button>
          <n-button @click="cancelEdit">取消</n-button>
        </div>
      </div>

      <div v-if="!isEdit" class="view-card">
        <div class="avatar-wrap">
          <img v-if="info.avatar" :src="info.avatar" class="avatar" />
          <div v-else class="avatar-empty">{{ info.name?.slice(0,1) }}</div>
        </div>
        <div class="info-item">
          <label>姓名</label>
          <span>{{ info.name }}</span>
        </div>
        <div class="info-item">
          <label>职位头衔</label>
          <span>{{ info.title }}</span>
        </div>
        <div class="info-item">
          <label>一句话介绍</label>
          <span>{{ info.slogan }}</span>
        </div>
        <div class="info-item">
          <label>邮箱</label>
          <span>{{ info.email }}</span>
        </div>
        <div class="info-item">
          <label>所在地区</label>
          <span>{{ info.region }}</span>
        </div>
        <div class="info-item">
          <label>简历地址</label>
          <span>{{ info.resumePath }}</span>
        </div>
        <div class="info-item full">
          <label>个人简介</label>
          <p>{{ info.intro }}</p>
        </div>
      </div>

      <n-form
        v-else
        ref="formRef"
        :model="editForm"
        :rules="rules"
        label-width="100"
        class="edit-card"
      >
        <div class="avatar-wrap">
          <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
          <div v-else class="avatar-empty">{{ editForm.name?.slice(0,1) }}</div>
          <n-upload
            v-model:file-list="avatarList"
            action=""
            :max="1"
            accept="image/*"
            :before-upload="checkAvatar"
            @change="onAvatarChange"
          >
            <n-button size="small">更换头像</n-button>
          </n-upload>
        </div>

        <n-form-item label="姓名" path="name">
          <n-input v-model:value="editForm.name" />
        </n-form-item>
        <n-form-item label="职位头衔" path="title">
          <n-input v-model:value="editForm.title" />
        </n-form-item>
        <n-form-item label="一句话介绍">
          <n-input v-model:value="editForm.slogan" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="editForm.email" />
        </n-form-item>
        <n-form-item label="所在地区">
          <n-input v-model:value="editForm.region" />
        </n-form-item>
        <n-form-item label="简历地址">
          <n-input v-model:value="editForm.resumePath" />
        </n-form-item>
        <n-form-item label="个人简介">
          <n-input v-model:value="editForm.intro" type="textarea" :rows="4" />
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
const msg = useMessage()
const formRef = ref(null)

const info = ref({
  name: '刘玉婷',
  title: '全栈开发工程师',
  slogan: '用代码构建优雅、高性能的 Web 体验。',
  avatar: '',
  email: '976134036@qq.com',
  region: '中国·上海',
  resumePath: '/resume.pdf',
  intro: '热爱开源与前端工程化，专注于 React / TypeScript 技术栈，拥有从 0 到 1 搭建产品的经验。关注性能优化、无障碍与良好的代码设计。'
})

const isEdit = ref(false)
const editForm = reactive({ ...info.value })
const avatarList = ref([])

watch(isEdit, (val) => {
  if(val) {
    Object.assign(editForm, info.value)
  }
})

const rules = {
  name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
  title: [{ required: true, message: '请填写头衔', trigger: 'blur' }],
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
  ]
}

const checkAvatar = (file) => {
  if(file.size > 2 * 1024 * 1024) {
    msg.warning('图片最大2MB')
    return false
  }
  return true
}
const onAvatarChange = (info) => {
  const file = info.file
  if(!file) return
  const reader = new FileReader()
  reader.onload = e => {
    editForm.avatar = e.target.result
  }
  reader.readAsDataURL(file.file)
}

const saveInfo = async () => {
  await formRef.value.validate()
  info.value = { ...editForm }
  localStorage.setItem('personalInfo', JSON.stringify(info.value))
  isEdit.value = false
  msg.success('个人信息修改成功！')
}
const cancelEdit = () => {
  isEdit.value = false
}

const loadLocal = () => {
  const str = localStorage.getItem('personalInfo')
  if(str) {
    try {
      const data = JSON.parse(str)
      info.value = data
    }catch(e){}
  }
}
loadLocal()
</script>

<style scoped>
.personal-page {
  min-height: calc(100vh - 60px);
  padding: 40px 20px;
  color: #fff;
}
.container {
  max-width: 700px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.btn-group {
  display: flex;
  gap:12px;
}
.view-card, .edit-card {
  background: rgba(20,25,40,0.65);
  border-radius: 14px;
  padding: 32px;
  backdrop-filter: blur(8px);
}
.avatar-wrap {
  text-align: center;
  margin-bottom: 24px;
}
.avatar {
  width: 130px;
  height:130px;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-empty {
  width:130px;
  height:130px;
  border-radius: 50%;
  background:#222840;
  display:grid;
  place-items:center;
  font-size:42px;
  margin:0 auto 12px;
}
.info-item {
  display:flex;
  padding:12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.info-item.full {
  flex-direction: column;
  gap:6px;
}
.info-item label {
  width:110px;
  color:#b0b8d4;
}
.info-item p {
  margin:0;
  line-height:1.7;
}
</style>
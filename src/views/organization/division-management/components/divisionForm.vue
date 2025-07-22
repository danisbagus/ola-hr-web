<template>
  <el-container style="height: 100%">
    <el-main>
      <el-form :model="form" label-width="80" :rules="rules" ref="formRef">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Status" prop="is_active">
          <el-switch v-model="form.is_active" />
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer height="auto">
      <div class="form-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ResDivisionDetail, ReqDivision } from '@/modules/division/division.types'
import { rules } from '@/views/organization/division-management/validation/rules'

const props = defineProps<{
  detail: Partial<ResDivisionDetail>
  form: ReqDivision
  mode: 'add' | 'edit'
}>()

const formRef = ref<FormInstance>()

const emit = defineEmits(['submit', 'cancel'])

const onSubmit = () => {
  emit('submit', props.form)
}
const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.form-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
}
</style>

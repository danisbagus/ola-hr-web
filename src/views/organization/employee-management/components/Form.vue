<template>
  <el-form :model="form" label-width="150px" :rules="rules" ref="formRef">
    <el-form-item label="Employee Number" prop="employee_number">
      <el-input v-model="detail.employee_number" disabled />
    </el-form-item>

    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>

    <el-form-item label="Phone Number" prop="phone_number">
      <el-input v-model="form.phone_number" />
    </el-form-item>

    <el-form-item label="Gender" prop="gender">
      <el-select v-model="form.gender" placeholder="Select gender">
        <el-option
          v-for="item in genders"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Birth Date" prop="birth_date">
      <el-date-picker
        v-model="form.birth_date"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="Employment Status" prop="employment_status">
      <el-select v-model="form.employment_status" placeholder="Select status">
        <el-option
          v-for="item in employmentStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Division" prop="division_id">
      <el-select v-model="form.division_id" placeholder="Select division">
        <el-option
          v-for="division in divisionDdl"
          :key="division.value"
          :label="division.label"
          :value="division.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Role" prop="role_id">
      <el-select v-model="form.role_id" placeholder="Select role">
        <el-option
          v-for="role in roleDdl"
          :key="role.value"
          :label="role.label"
          :value="role.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Hire Date" prop="hire_date">
      <el-date-picker
        v-model="form.hire_date"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-input type="textarea" v-model="form.address" rows="2" />
    </el-form-item>

    <el-form-item label="Status" prop="is_active">
      <el-switch v-model="form.is_active" />
    </el-form-item>

    <!-- Footer Button Area -->
    <div class="form-footer">
      <slot name="footer">
        <!-- default jika slot tidak disediakan -->
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </slot>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useDdl } from '@/modules/ddl/ddl.hook '
import type { ResEmployeeDetail, ReqUpdateEmployee } from '@/modules/employee/employee.types'
import { rules } from '@/views/organization/employee-management/validation/rules'

const { divisionDdl, roleDdl, genders, employmentStatus } = useDdl()

const props = defineProps<{
  detail: ResEmployeeDetail
  form: ReqUpdateEmployee
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
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>

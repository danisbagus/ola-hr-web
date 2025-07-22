<template>
  <div class="card table-search">
    <el-form ref="formRef" :model="employeeListParams">
      <Grid :gap="[30, 0]">
        <GridItem>
          <FormFilterInput
            filterType="select"
            label="Division"
            v-model="employeeListParams.division_id"
            :options="divisionDdl"
            clearable
          />
        </GridItem>

        <GridItem>
          <FormFilterInput
            filterType="select"
            label="Role"
            v-model="employeeListParams.role_id"
            :options="roleDdl"
            clearable
          />
        </GridItem>

        <GridItem>
          <FormFilterInput
            filterType="select"
            label="Status"
            v-model="employeeListParams.is_active"
            :options="generalStatus"
            clearable
          />
        </GridItem>

        <GridItem>
          <FormFilterInput
            filterType="input"
            label="Search"
            placeholder="Please Enter Employee Name or ID"
            v-model="employeeListParams.keyword"
            clearable
          />
        </GridItem>

        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="getEmployeeList"> Search </el-button>
            <el-button :icon="Delete" @click="resetListParams"> Reset </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'

import Grid from '@/components/grid/index.vue'
import GridItem from '@/components/grid/components/grid-item.vue'
import FormFilterInput from '@/components/form-filter-input/index.vue'
import { useEmployee } from '@/modules/employee/employee.hook'
import { useDdl } from '@/modules/ddl/ddl.hook.ts'

const { getEmployeeList, resetListParams, employeeListParams } = useEmployee()
const { getDivisionDdl, getRoleDdl, divisionDdl, roleDdl, generalStatus } = useDdl()

const onInit = () => {
  getDivisionDdl()
  getRoleDdl()
}

onMounted(onInit)
</script>

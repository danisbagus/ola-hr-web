<template>
  <div class="card table-search">
    <el-form ref="formRef" :model="divisionListParams">
      <Grid :gap="[30, 0]">
        <GridItem>
          <FormFilterInput
            filterType="input"
            label="Search"
            placeholder="Please Enter Division Name"
            v-model="divisionListParams.keyword"
          />
        </GridItem>

        <GridItem>
          <FormFilterInput
            filterType="select"
            label="Status"
            v-model="divisionListParams.is_active"
            :options="generalStatus"
          />
        </GridItem>

        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="getDivisionList"> Search </el-button>
            <el-button :icon="Delete" @click="resetListParams"> Reset </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// Third-party UI
import { Delete, Search } from '@element-plus/icons-vue'

// Internal modules
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'
import FormFilterInput from '@/components/FormFilterInput/index.vue'
import { useDivision } from '@/modules/division/division.hook'
import { useDdl } from '@/modules/ddl/ddl.hook.ts'

// Hooks
const { getDivisionList, resetListParams, divisionListParams } = useDivision()
const { generalStatus } = useDdl()
</script>

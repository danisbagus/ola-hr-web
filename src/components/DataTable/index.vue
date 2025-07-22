<template>
  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader" :selected-list-ids="selectedListIds" :is-selected="isSelected" />
      </div>
      <div class="header-button-ri">
        <slot name="toolButton"> </slot>
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="dataSource"
      :row-key="rowKey"
      @selection-change="selectionChange"
      :border="false"
    >
      <template v-for="item in columnList" :key="item">
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type)"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        >
        </el-table-column>
        <TableColumn v-else :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>No data</div>
          </slot>
        </div>
      </template>
    </el-table>

    <slot name="pagination"> </slot>
  </div>
</template>

<script setup lang="ts" name="Table">
import { computed } from 'vue'
import { ElTable } from 'element-plus'

import type { DataTable, ColumnProps, TypeProps } from '@/components/DataTable/types'

import TableColumn from './components/TableColumn.vue'
import { useSelection } from '@/shared/hooks/selection.hook'

const props = withDefaults(defineProps<DataTable>(), {
  dataSource: () => [],
  columns: () => [],
  rowKey: 'id'
})

const { selectionChange, selectedListIds, isSelected } = useSelection(props.rowKey)

const columnTypes: TypeProps[] = ['selection']
const columnList = computed<ColumnProps[]>(() => props.columns || [])
</script>

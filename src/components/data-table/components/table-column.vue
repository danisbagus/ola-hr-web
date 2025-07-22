<template>
  <!-- Komponen kolom untuk el-table dari Element Plus -->
  <!-- align: Penyesuaian align kolom, default ke 'center' jika tidak ada nilai
    showOverflowTooltip: Menampilkan tooltip jika teks overflow, default ke false jika tidak ada nilai
    v-bind: Spread semua properti kolom lainnya -->
  <el-table-column
    :align="column.align ?? 'center'"
    :show-overflow-tooltip="column.showOverflowTooltip ?? column.prop !== 'operation'"
    v-bind="column"
  >
    <!-- Slot default untuk konten sel -->
    <template #default="scope">
      <!-- Jika kolom menyediakan render function kustom -->
      <template v-if="column.render">
        <component :is="column.render(scope)" />
      </template>

      <!-- Jika ada slot kustom berdasarkan nama prop -->
      <template v-else-if="column.prop && slots[handleProp(column.prop)]">
        <slot :name="handleProp(column.prop)" v-bind="scope" />
      </template>

      <!-- Default rendering jika tidak ada render function atau slot -->
      <template v-else>
        {{ formatValue(handleRowAccordingToProp(scope.row, column.prop!)) }}
      </template>
    </template>

    <!-- Slot untuk header kolom -->
    <template #header="scope">
      <!-- Jika ada slot header kustom -->
      <template v-if="column.prop && $slots[`${handleProp(column.prop)}Header`]">
        <slot :name="`${handleProp(column.prop)}Header`" v-bind="scope" />
      </template>

      <!-- Default header jika tidak ada slot header -->
      <template v-else>
        {{ column.label }}
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import type { ColumnProps } from '@/components/data-table/types'
// Utilitas bantu untuk format nilai dan handle prop bertingkat
import { formatValue, handleProp, handleRowAccordingToProp } from '@/shared/utils/prop'

// Mengakses semua slot yang diberikan dari parent
const slots = useSlots()

// Mendeklarasikan prop tunggal: kolom
defineProps<{
  column: ColumnProps
}>()
</script>

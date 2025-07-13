<template>
  <!-- Komponen dinamis berdasarkan jenis elemen search -->
  <component
    :is="componentType"
    v-bind="{ ...mergedProps, ...placeholders, searchParam: searchParam, clearable }"
    v-model.trim="searchParam[inputKey]"
  >
    <!-- Template khusus untuk komponen select (opsi dropdown) -->
    <template v-if="column.search?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="item in columnEnum"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></component>
    </template>

    <!-- Default slot jika tidak termasuk kondisi di atas -->
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed } from 'vue'
import { handleProp } from '@/utils'
import type { ColumnProps } from '@/components/DynamicTable/interface'

// Definisi props untuk komponen pencarian tunggal
interface SearchFormItem {
  column: ColumnProps // Kolom yang berisi konfigurasi search
  searchParam: { [key: string]: any } // Objek yang menyimpan nilai pencarian
}

const props = defineProps<SearchFormItem>()

// menentukan tipe komponen pencarian
const componentType = computed(() => {
  const search = props.column.search
  return search?.render ?? `el-${search?.el}`
})

// Menangani key untuk komponen pencarian
const inputKey = computed(() => {
  return props.column.search?.key ?? handleProp(props.column.prop!)
})

// Filter enum berdasarkan value dan label
const columnEnum = computed(() => {
  const enumData = props.column?.enum || []

  return enumData
    .filter(item => {
      // Pengecekan value yang benar (termasuk jika false, 0, atau empty string)
      const hasValidValue = item?.value !== undefined && item?.value !== null

      // Pengecekan label (harus ada dan tidak empty string)
      const hasValidLabel = item?.label !== undefined && item?.label !== null && item?.label !== ''

      // Hanya filter isDisabled jika kedua syarat di atas terpenuhi
      return hasValidValue && hasValidLabel && item.isDisabled !== true
    })
    .map(item => ({
      value: item.value,
      label: item.label
    }))
})

// Merge props yang dibutuhkan oleh komponen pencarian
const mergedProps = computed(() => {
  return props.column.search?.props ?? {}
})

// Menentukan placeholder untuk komponen pencarian
const placeholders = computed(() => {
  const searchProps = mergedProps.value
  const isRange =
    ['datetimerange', 'daterange', 'monthrange'].includes(searchProps.type) || searchProps.isRange

  if (isRange) {
    return {
      rangeSeparator: searchProps.rangeSeparator ?? 'To',
      startPlaceholder: searchProps.startPlaceholder ?? 'Start Time',
      endPlaceholder: searchProps.endPlaceholder ?? 'End Time'
    }
  }

  const defaultPlaceholder =
    searchProps.placeholder ??
    (props.column.search?.el?.includes('input') ? 'Please Enter' : 'Please Select')
  return { placeholder: defaultPlaceholder }
})

// Menentukan apakah field bisa dikosongkan (tombol clearable muncul)
const clearable = computed(() => {
  const search = props.column.search
  return search?.props?.clearable ?? search?.defaultValue == null
})
</script>

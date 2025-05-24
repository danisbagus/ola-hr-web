<template>
  <!-- Komponen dinamis berdasarkan jenis elemen search -->
  <component
    :is="column.search?.render ?? `el-${column.search?.el}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParam: _searchParam, clearable }"
    v-model.trim="_searchParam[column.search?.key ?? handleProp(column.prop!)]"
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
import { computed, inject, ref } from 'vue'
import { handleProp } from '@/utils'
import type { ColumnProps } from '@/components/Table/interface'

// Definisi props untuk komponen pencarian tunggal
interface SearchFormItem {
  column: ColumnProps // Kolom yang berisi konfigurasi search
  searchParam: { [key: string]: any } // Objek yang menyimpan nilai pencarian
}

const props = defineProps<SearchFormItem>()

// Membungkus searchParam agar menjadi reaktif
const _searchParam = computed(() => props.searchParam)

// Menentukan nama properti untuk label, value, dan children dari fieldNames
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label', // label default: "label"
    value: props.column.fieldNames?.value ?? 'value', // value default: "value"
    children: props.column.fieldNames?.children ?? 'children' // children default: "children"
  }
})

// new code
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

// Menangani props tambahan untuk komponen pencarian
const handleSearchProps = computed(() => {
  let searchProps = props.column.search?.props ?? {}
  return searchProps
})

// Menentukan placeholder secara default berdasarkan tipe pencarian
const placeholder = computed(() => {
  const search = props.column.search

  // Jika input berupa range, gunakan placeholder khusus untuk waktu mulai & akhir
  if (
    ['datetimerange', 'daterange', 'monthrange'].includes(search?.props?.type) ||
    search?.props?.isRange
  ) {
    return {
      rangeSeparator: search?.props?.rangeSeparator ?? '至',
      startPlaceholder: search?.props?.startPlaceholder ?? '开始时间',
      endPlaceholder: search?.props?.endPlaceholder ?? '结束时间'
    }
  }

  // Placeholder umum: "Please Enter" untuk input, "Please Select" untuk selain input
  const placeholder =
    search?.props?.placeholder ?? (search?.el?.includes('input') ? 'Please Enter' : 'Please Select')
  return { placeholder }
})

// Menentukan apakah field bisa dikosongkan (tombol clearable muncul)
const clearable = computed(() => {
  const search = props.column.search

  // Jika tidak ada defaultValue, maka tampilkan tombol clearable
  return (
    search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined)
  )
})
</script>

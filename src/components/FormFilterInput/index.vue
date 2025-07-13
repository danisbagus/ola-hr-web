<template>
  <el-form-item>
    <template #label>
      <el-space :size="4">
        <span>{{ label }}</span>
        <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
          <i class="iconfont icon-yiwen" />
        </el-tooltip>
      </el-space>
      <span>&nbsp;:</span>
    </template>

    <component :is="typeMap[filterType]" v-bind="inputProps" v-model="localValue">
      <template v-if="filterType === 'select'">
        <el-option
          v-for="item in optionItems"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </template>
    </component>
  </el-form-item>
</template>

<script setup lang="ts" name="FormFilterInput">
import { computed } from 'vue'
import type { FormFilterInput } from '@/components/FormFilterInput/interface'

const props = defineProps<FormFilterInput>()
const { filterType, label, options, placeholder, tooltip, clearable, props: rawProps = {} } = props

const emit = defineEmits(['update:modelValue'])

// v-model binding internal
const localValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const typeMap: Record<string, string> = {
  input: 'el-input',
  select: 'el-select'
}

const optionItems = computed(() => {
  if (!options) return []
  return options
    .filter(
      ({ value, label, disabled }) =>
        value !== undefined &&
        value !== null &&
        label !== undefined &&
        label !== null &&
        label !== '' &&
        !disabled
    )
    .map(({ value, label }) => ({ value, label }))
})

const inputProps = computed(() => ({
  ...rawProps,
  clearable,
  placeholder: placeholder ?? (filterType.includes('input') ? 'Please Enter' : 'Please Select')
}))
</script>

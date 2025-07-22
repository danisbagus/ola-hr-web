<template>
  <div class="table-box">
    <EmployeeFilter />
    <EmployeeList />
  </div>
</template>

<script setup lang="tsx">
import EmployeeFilter from './components/employee-filter.vue'
import EmployeeList from './components/employee-list.vue'
</script>

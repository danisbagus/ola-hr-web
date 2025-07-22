<template>
  <el-pagination
    :background="true"
    :current-page="paginationMeta.page"
    :page-size="paginationMeta.size"
    :page-sizes="[10, 25, 50, 100]"
    :total="paginationMeta.total_data"
    :size="'default'"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
import type { ResPaginationMeta as PaginationMeta } from '@/shared/types/pagination'

interface PaginationProps {
  paginationMeta: PaginationMeta
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

defineProps<PaginationProps>()
</script>

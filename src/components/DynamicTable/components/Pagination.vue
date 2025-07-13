<template>
  <!-- Komponen Pagination menggunakan Element Plus -->
  <!-- background: true → memberikan latar belakang putih untuk tombol pagination -->
  <!-- current-page → nomor halaman aktif -->
  <!-- page-size → jumlah data per halaman -->
  <!-- page-sizes → daftar opsi ukuran halaman yang bisa dipilih -->
  <!-- total → total jumlah data -->
  <!-- layout → mengatur urutan dan tampilan elemen dalam pagination -->
  <!-- @size-change → event ketika ukuran halaman diubah -->
  <!-- @current-change → event ketika halaman aktif berubah -->
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

/**
 * Props yang harus diterima oleh komponen Pagination ini:
 * - paginationMeta: data pagination (jumlah total, halaman aktif, ukuran halaman)
 * - handleSizeChange: fungsi handler ketika ukuran halaman berubah
 * - handleCurrentChange: fungsi handler ketika halaman aktif berubah
 */
interface PaginationProps {
  paginationMeta: PaginationMeta
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

// Mendeklarasikan props yang diterima oleh komponen ini
defineProps<PaginationProps>()
</script>

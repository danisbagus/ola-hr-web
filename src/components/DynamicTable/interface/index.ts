// import { VNode, ComponentPublicInstance, Ref } from "vue";
import type { VNode, Ref } from 'vue'
import type { BreakPoint, Responsive } from '@/components/grid/types'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export interface EnumProps {
  label?: string // Teks yang ditampilkan pada pilihan dropdown / select
  value?: string | number | boolean | any[] // Nilai yang terkait dengan opsi ini (bisa string, angka, boolean, array, dll)
  disabled?: boolean // Menentukan apakah opsi ini nonaktif (tidak bisa dipilih)
}

// export type TypeProps =
//   | 'index' // Menampilkan nomor urut baris secara otomatis
//   | 'selection' // Menampilkan kotak centang (checkbox) untuk memilih banyak baris
//   | 'radio' // Menampilkan tombol radio untuk memilih satu baris
//   | 'expand' // Menampilkan ikon panah untuk membuka detail baris (row expansion)
//   | 'sort' // Kolom khusus untuk fitur sortir (biasanya tanpa data)

export type TypeProps = 'selection'

// Tipe-tipe komponen pencarian yang tersedia
// export type SearchType =
//   | 'input' // Input teks biasa
//   | 'input-number' // Input angka (number field)
//   | 'select' // Dropdown (select biasa)
//   | 'select-v2' // Versi 2 dari select, dengan performa lebih baik untuk data besar
//   | 'tree-select' // Select berbentuk pohon hierarki
//   | 'cascader' // Cascader (multi-level dropdown)
//   | 'date-picker' // Komponen untuk memilih tanggal
//   | 'time-picker' // Komponen untuk memilih waktu (jam & menit)
//   | 'time-select' // Dropdown pilihan waktu (jam) bukan picker
//   | 'switch' // Tombol toggle on/off (boolean)
//   | 'slider' // Slider angka untuk rentang nilai

export type SearchType = 'input' | 'select'

export type SearchRenderScope = {
  searchParam: { [key: string]: any } // Objek yang menyimpan nilai dari semua input pencarian (v-model)
  placeholder: string // Teks placeholder yang ditampilkan di input
  clearable: boolean // Apakah input bisa dikosongkan (tombol clear ditampilkan)
  options: EnumProps[] // Data enum untuk elemen seperti select, select-v2, atau cascader
  data: EnumProps[] // Sama seperti options; bisa digunakan untuk fleksibilitas, misalnya untuk custom render
}

export type SearchProps = {
  // Jenis elemen isnput untuk item pencarian (misalnya: input, select, date-picker, dll)
  el?: SearchType

  // Label teks yang ditampilkan di samping elemen pencarian
  label?: string

  // Properti tambahan yang akan diteruskan langsung ke komponen pencarian (mengikuti dokumentasi Element Plus)
  props?: any

  // Kunci unik untuk item pencarian, digunakan jika berbeda dari nama `prop` utama kolom
  key?: string

  // Teks bantuan (tooltip) yang ditampilkan saat hover di label item pencarian
  tooltip?: string

  // Urutan tampilan item pencarian (nilai lebih besar akan tampil lebih awal)
  order?: number

  // Jumlah kolom grid yang digunakan oleh item pencarian (default = 1 kolom)
  span?: number

  // Jumlah kolom grid untuk menggeser item pencarian ke kanan
  offset?: number

  // Nilai default yang diisi pada saat pertama kali komponen dimuat
  defaultValue?: string | number | boolean | any[] | Ref<any>

  // Fungsi untuk merender konten pencarian secara kustom menggunakan sintaks JSX/TSX
  render?: (scope: SearchRenderScope) => VNode
} & Partial<Record<BreakPoint, Responsive>>
// Dukungan responsif berdasarkan breakpoint layar (misalnya xs, sm, md, lg, xl)
// Tiap breakpoint bisa diisi dengan konfigurasi `Responsive` seperti span dan offset

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export interface ColumnProps<T = any>
  // Meng-extend sebagian properti dari TableColumnCtx kecuali 'type', 'children', 'renderCell', dan 'renderHeader'
  extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
  // Tipe kolom, misalnya: index, selection, expand, dlsl.
  type?: TypeProps

  // Konfigurasi terkait fitur pencarian untuk kolom ini.
  // Bisa null/undefined jika tidak ingin mendukung pencarian.
  search?: SearchProps | undefined

  // Daftar enumerasi untuk kolom ini (sering digunakan untuk mapping value ke label).
  // Bisa berupa array langsung, Ref reaktif.
  enum?: EnumProps[] | Ref<EnumProps[]>

  // Untuk menyesuaikan nama properti dari item enum, misalnya key yang digunakan untuk 'label', 'value', dan 'children'.
  fieldNames?: FieldNamesProps

  // Fungsi untuk merender isi sel secara kustom menggunakan JSX/TSX atau string biasa.
  render?: (scope: RenderScope<T>) => VNode | string
}

// Tipe `RenderScope<T>` digunakan untuk mendefinisikan konteks data yang tersedia aat merender sel (`cell`) dalam sebuah tabel. Tipe ini biasa digunakan dalam fungsi render atau slot khusus seperti `v-slot="{ row, $index, column }"`.
// saat merender sel dalam sebuah tabel. Cocok digunakan untuk custom render .
// @template T Tipe data per baris tabel (biasanya berupa object)
export type RenderScope<T> = {
  row: T // Data baris saat ini
  $index: number // Indeks baris saat ini
  column: TableColumnCtx<T> // Informasi kolom terkait (misalnya, prop, label, dll.)
  [key: string]: any // Untuk properti tambahan (opsional)
}

export namespace Table {
  export interface Pageable {
    pageNum: number // Nomor halaman saat ini
    pageSize: number // Jumlah data per halaman
    total: number // Total jumlah data keseluruhan
  }

  export interface StateProps {
    tableData: any[] // Data baris dalam tabel
    pageable: Pageable // Informasi pagination
    searchParam: { [key: string]: any } // Parameter pencarian saat ini
    searchInitParam: { [key: string]: any } // Parameter pencarian default (saat reset)
    totalParam: { [key: string]: any } // Parameter total yang dikirim ke API (gabungan pencarian dan pagination)
    icon?: { [key: string]: any } // (Opsional) Untuk menyimpan icon atau konfigurasi UI tambahan
  }
}

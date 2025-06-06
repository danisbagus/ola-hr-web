// Mengimpor tipe `PersistedStateOptions` dari plugin `pinia-plugin-persistedstate`.
// Tipe ini digunakan untuk mendefinisikan konfigurasi penyimpanan state yang dipersisten.
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

// Mendefinisikan fungsi `piniaPersistConfig` yang menerima dua parameter:
// - `key`: string yang akan digunakan sebagai nama key di `localStorage` atau `sessionStorage`.
// - `paths`: opsional array string, menentukan properti state mana saja yang ingin disimpan.
const piniaPersistConfig = (key: string, pick?: string[]) => {
  // Membuat objek konfigurasi `persist` dengan tipe `PersistedStateOptions`.
  // Ini menentukan bagaimana dan di mana state akan disimpan.
  const persist: PersistenceOptions = {
    key: key, // Nama key untuk menyimpan data di storage (misalnya 'ola-hr-user').
    storage: localStorage, // Menentukan media penyimpanan; bisa diganti ke sessionStorage jika perlu.
    // storage: sessionStorage, // Alternatif: bisa diaktifkan jika ingin menggunakan sessionStorage.

    pick: pick // Menentukan properti mana saja yang ingin disimpan. [] berarti tidak ada properti yang disimpan, dan undefined berarti semua properti disimpan.
  }

  // Mengembalikan konfigurasi persist.
  return persist
}

// Mengekspor fungsi `piniaPersistConfig` sebagai export default,
// agar bisa digunakan di store untuk mengatur konfigurasi persist dengan mudah dan konsisten.
export default piniaPersistConfig

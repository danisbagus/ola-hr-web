// Mengimpor `defineStore` dari Pinia, yang digunakan untuk mendefinisikan store baru.
import { defineStore } from 'pinia'

// Mengimpor tipe data `UserState` dari file interface. Ini digunakan untuk memberikan tipe pada state store.
import type { UserState } from '@/stores/interface'

// Mengimpor konfigurasi persist untuk Pinia, yang akan digunakan agar state store dapat disimpan secara persisten.
import piniaPersistConfig from '@/stores/helper/persist'

// Mendefinisikan dan mengekspor store Pinia bernama `useUserStore`. identifikasi store ini adalah 'ola-hr-user'.
export const useUserStore = defineStore('ola-hr-user', {
  //  State awal store, bertipe `UserState`.
  //   // Di sini didefinisikan dua properti: `token` sebagai string kosong, dan `userInfo` sebagai objek dengan properti `name`.

  // tanpa interface
  // state: () => {
  //   return {
  //     token: '',
  //     userInfo: { name: 'Admin' }
  //   }
  // },

  // State awal store, bertipe `UserState`.
  // Di sini didefinisikan dua properti: `token` sebagai string kosong, dan `userInfo` sebagai objek dengan properti `name`.
  state: (): UserState => ({
    token: '',
    userInfo: { name: 'Admin' }
  }),

  // Getter kosong (tidak ada getter yang didefinisikan saat ini),
  // tapi struktur ini disiapkan untuk menambahkan fungsi turunan dari state di masa depan.
  getters: {},

  // Kumpulan aksi (methods) yang dapat memodifikasi state.
  actions: {
    // Method untuk mengatur/mengubah nilai `token`.
    setToken(token: string) {
      this.token = token
    },

    // Method untuk mengatur/mengubah nilai `userInfo`.
    // Tipe parameternya diambil dari struktur `UserState['userInfo']` untuk menjaga konsistensi.
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    }
  },

  // Konfigurasi persist untuk menyimpan state secara otomatis (misalnya di localStorage).
  // Fungsi `piniaPersistConfig` menerima nama key yang digunakan dalam storage.
  persist: piniaPersistConfig('ola-hr-user')
})

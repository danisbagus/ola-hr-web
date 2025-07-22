import { ElLoading } from 'element-plus'

// Variabel global untuk menyimpan instance loading
let loadingInstance: ReturnType<typeof ElLoading.service>

// Fungsi untuk memulai loading fullscreen
const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true, // Tampilkan loading dalam mode layar penuh
    lock: true, // Kunci layar agar pengguna tidak bisa berinteraksi
    text: 'Loading', // Teks yang ditampilkan saat loading
    background: 'rgba(0, 0, 0, 0.7)' // Latar belakang hitam transparan
  })
}

// Fungsi untuk menghentikan loading fullscreen
const endLoading = () => {
  loadingInstance.close() // Tutup loading
}

// Variabel untuk menghitung jumlah permintaan yang membutuhkan loading
let needLoadingRequestCount = 0

// Fungsi untuk menampilkan loading fullscreen
// Hanya akan memanggil startLoading saat tidak ada request lain yang sedang berjalan
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    // Jika tidak ada request sebelumnya
    startLoading() // Mulai loading
  }
  needLoadingRequestCount++ // Tambahkan jumlah request
}

// Fungsi untuk mencoba menyembunyikan loading
// Loading hanya akan ditutup jika semua request selesai
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return // Jika tidak ada request yang tersisa, hentikan
  needLoadingRequestCount-- // Kurangi jumlah request
  if (needLoadingRequestCount === 0) {
    // Jika semua request sudah selesai
    endLoading() // Hentikan loading
  }
}

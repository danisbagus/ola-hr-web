<template>
  <!-- Container utama dengan class flex center -->
  <div class="login-container flx-center">
    <div class="login-box">
      <!-- Bagian kiri: gambar ilustrasi -->
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>

      <!-- Bagian kanan: form login -->
      <div class="login-form">
        <!-- Logo dan nama aplikasi -->
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">OLA-HR</h2>
        </div>

        <!-- Form login menggunakan Element Plus -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
          <!-- Input Email -->
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" placeholder="Email">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <user />
                  <!-- Icon user -->
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- Input Password -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="password"
              show-password
              autocomplete="new-password"
            >
              <template #prefix>
                <el-icon class="el-input__icon">
                  <lock />
                  <!-- Icon lock -->
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <!-- Tombol aksi -->
        <div class="login-btn">
          <!-- Tombol reset form -->
          <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">
            Reset
          </el-button>

          <!-- Tombol login -->
          <el-button
            :icon="UserFilled"
            round
            size="large"
            type="primary"
            :loading="loading"
            @click="login(loginFormRef)"
          >
            Login
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ref: Membuat reactive primitive value (nilai tunggal reaktif).
// Digunakan untuk: nilai tunggal seperti string, number, boolean, null, atau DOM reference.
// example: const count = ref(0); count.value++ (harus menggunakan .value)

// reactive: Membuat reactive object (objek reaktif) — biasanya digunakan untuk objek atau array.
// Digunakan untuk: form data, struktur kompleks.
// example: const state = reactive({ count: 0 }); state.count++ (tidak perlu menggunakan .value)

// onMounted: Lifecycle hook Vue — dipanggil saat komponen selesai dirender (mount) ke DOM.
// Digunakan untuk: menjalankan kode setelah tampilan siap, seperti menambahkan event listener atau mengambil data awal

// onBeforeUnmount: Hook yang dipanggil sebelum komponen di-unmount dari DOM. dipanggil sebelum komponen dihancurkan / unmount dari DOM (keluar dari layar).
// Digunakan untuk: membersihkan event listener, timer, atau operasi yang harus dihentikan sebelum komponen hilang.

import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// Tipe data untuk form login dari interface API
import type { Login } from '@/api/interface'
import { loginApi } from '@/api/modules/auth.api'

// Mengimpor Pinia stores
import { useUserStore } from '@/stores/modules/user/user.store'
import { useTabsStore } from '@/stores/modules/tabs/tabs.store'
import { useKeepAliveStore } from '@/stores/modules/keepAlive/keepAlive.store'

// Tipe komponen form dari Element Plus
import type { ElForm } from 'element-plus'

// Icon untuk tombol dari Element Plus
import { CircleClose, UserFilled } from '@element-plus/icons-vue'

// Fungsi untuk menambahkan router dinamis
import { initDynamicRouter } from '@/router/modules/dynamicRouter'

// Konstanta URL home
import { HOME_URL } from '@/config'

// Notifikasi UI
import { ElNotification } from 'element-plus'

// Store inisialisasi
const userStore = useUserStore()
const tabsStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()

// Router inisialisasi
const router = useRouter()

// InstanceType<T> adalah utility type bawaan TypeScript yang digunakan untuk mendapatkan tipe instance dari sebuah konstruktor (class atau fungsi yang bisa di-new
// Tipe form instance (untuk validasi)
type FormInstance = InstanceType<typeof ElForm>

// Referensi ke form login
const loginFormRef = ref<FormInstance>()

// Aturan validasi form login
const loginRules = reactive({
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
  ],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
})

// Loading state tombol login
const loading = ref(false)

// Data form login (email & password)
const loginForm = reactive<Login.ReqLoginForm>({
  email: '',
  password: ''
})

// Fungsi utama login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // Validasi form
  formEl.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      // 1. Eksekusi API login
      const { data } = await loginApi(loginForm)
      userStore.setToken(data.token) // Simpan token ke store

      // 2. Inisialisasi routing dinamis berdasarkan hak akses
      await initDynamicRouter()

      // 3. Bersihkan tab & keep-alive store (reset state UI)
      tabsStore.setTabs([])
      keepAliveStore.setKeepAliveName([])

      // 4. Arahkan user ke halaman utama (HOME_URL)
      router.push(HOME_URL)

      // 5. Tampilkan notifikasi berhasil login
      ElNotification({
        title: 'Successfully Logged In',
        message: 'Welcome back to your account!',
        type: 'success',
        duration: 5000,
        position: 'top-right',
        customClass: 'login-notification'
      })
    } finally {
      loading.value = false // Reset tombol loading
    }
  })
}

// Fungsi reset form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// Hook lifecycle dari Vue 3 — akan dijalankan saat komponen selesai dirender ke DOM.
onMounted(() => {
  // Setiap kali tombol ditekan, event keydown akan ditangkap secara global oleh document
  document.onkeydown = (e: KeyboardEvent) => {
    // untuk memastikan bahwa tombol yang ditekan adalah tombol Enter, baik dari keyboard utama maupun keypad numerik
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      // Jika tombol Enter ditekan dan tombol loading belum aktif, jalankan fungsi login
      if (loading.value) return
      login(loginFormRef.value)
    }
  }
})

// Hook lifecycle yang dipanggil sebelum komponen dihancurkan (unmounted).
onBeforeUnmount(() => {
  //  event listener global untuk keydown akan dihapus ketika komponen keluar dari tampilan. Ini penting untuk:
  // 1. Mencegah memory leak
  // 2. Menghindari konflik jika komponen lain juga menggunakan keydown
  document.onkeydown = null
})

// [v] templating
// [v] wording
// [v]styling
// [v] function
// integration
</script>

<style lang="scss">
.login-container {
  height: 100%; // Mengatur tinggi elemen agar 100% dari elemen induknya (biasanya <body> atau <html>)
  min-height: 550px; // Mencegah elemen terlalu pendek, bahkan jika 100% parent-nya kurang dari 550px
  background-color: #eeeeee; // Warna latar belakang abu terang (#eeeeee = hampir putih)
  background-image: url('@/assets/images/login_bg.svg'); // Memuat gambar latar dari path relatif, sering digunakan dalam Vite/Webpack alias '@'
  background-size: 100% 100%; // Gambar diperbesar agar mengisi seluruh lebar dan tinggi elemen — bisa membuat gambar melar (distorsi)
  background-size: cover; // Gambar mengisi elemen sepenuhnya tanpa distorsi — menjaga aspek rasio, tapi bisa memotong bagian gambar

  .login-box {
    position: relative; // Elemen bisa menjadi referensi posisi untuk elemen anak yang menggunakan position: absolute
    box-sizing: border-box; // Padding dan border dimasukkan dalam total width dan height (mencegah meluap dari container)
    display: flex; // Mengaktifkan Flexbox — anak-anaknya bisa disejajarkan secara horizontal atau vertikal
    align-items: center; // Menyusun anak-anak flex secara vertikal di tengah kontainer (cross-axis)
    justify-content: space-around; // Menyebar anak-anak dengan jarak seimbang di sekelilingnya (main-axis)
    width: 96.5%; // Lebar elemen 96.5% dari induknya — memberi sedikit margin di kiri-kanan
    height: 94%; // Tinggi elemen 94% dari induknya — memberi ruang atas-bawah
    padding: 0 50px; // Padding horizontal 50px; atas & bawah tetap 0
    background-color: rgb(
      255 255 255 / 80%
    ); // Latar belakang putih transparan (opacity 80%) menggunakan sintaks modern CSS color level 4
    border-radius: 10px; // Membuat sudut elemen membulat dengan radius 10px

    .login-left {
      width: 800px; // Lebar tetap 800px — untuk elemen ilustrasi atau gambar kiri
      margin-right: 10px; // Jarak ke kanan sejauh 10px untuk memisahkan dengan form

      .login-left-img {
        width: 100%; // Gambar mengisi lebar kontainer
        height: 100%; // Gambar juga mengisi tinggi penuh kontainer
      }
    }

    .login-form {
      width: 420px; // Lebar tetap form login — cukup luas untuk menampung input dan tombol
      padding: 50px 40px 45px; // Atas 50px, kanan-kiri 40px, bawah 45px — memberi ruang dalam agar konten tidak menempel pinggir
      background-color: var(
        --el-bg-color
      ); // Mengambil warna latar dari variabel CSS — umumnya berasal dari tema (Element Plus, dsb.)
      border-radius: 10px; // Membuat sudut form menjadi membulat
      box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;
      // Memberi bayangan lembut di belakang elemen:
      // - Warna: hitam transparan 10%
      // - Offset horizontal: 0px (tidak bergeser ke kanan/kiri)
      // - Offset vertikal: 2px (turun sedikit ke bawah)
      // - Blur radius: 10px (seberapa kabur bayangan)
      // - Spread radius: 2px (seberapa jauh bayangan meluas dari elemen)

      .login-logo {
        display: flex; // Layout horizontal untuk logo dan teks
        align-items: center; // Vertikal tengah
        justify-content: center; // Horizontal tengah
        margin-bottom: 45px; // Memberi jarak 45px di bawah logo — agar tidak terlalu dekat dengan input form

        .login-icon {
          width: 60px; // Ikon logo lebar 60px
          height: 52px; // Tinggi ikon 52px
        }

        .logo-text {
          padding: 0 0 0 25px; // Padding kiri 25px — memisahkan teks dari ikon
          margin: 0; // Hapus margin default
          font-size: 42px; // Ukuran teks besar — cocok untuk branding
          font-weight: bold; // Teks tebal — lebih menonjol
          color: #34495e; // Warna biru gelap keabu-abuan — memberi kesan profesional
          white-space: nowrap; // Mencegah teks berpindah baris meskipun panjang — akan tetap dalam satu baris
        }
      }

      .el-form-item {
        margin-bottom: 40px; // Jarak antar field form sebesar 40px — memberi ruang agar tidak terlalu rapat
      }

      .login-btn {
        display: flex; // Flex layout untuk tombol
        justify-content: space-between; // Tombol akan berada di sisi kiri dan kanan (atau tersebar jika lebih dari dua)
        width: 100%; // Isi penuh lebar kontainer form
        margin-top: 40px; // Jarak atas dari form sebelumnya (field terakhir)
        white-space: nowrap; // Mencegah teks tombol meluncur ke baris baru

        .el-button {
          width: 185px; // Setiap tombol memiliki ukuran tetap 185px — agar sejajar dan seragam
        }
      }
    }
  }
}

@media screen and (width <= 1250px) {
  .login-left {
    display: none; /* Sembunyikan elemen .login-left pada layar dengan lebar ≤ 1250px (responsif untuk tablet/laptop kecil) */
  }
}

@media screen and (width <= 600px) {
  .login-form {
    width: 97% !important; /* Form akan hampir selebar layar di perangkat kecil (mobile); 
                                 gunakan !important agar override properti sebelumnya */
  }
}
</style>

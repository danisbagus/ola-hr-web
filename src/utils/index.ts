export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if (propArr.length == 1) return prop
  return propArr[propArr.length - 1]
}

// Fungsi untuk memformat nilai (value) agar bisa ditampilkan dengan rapi di UI.
export function formatValue(callValue: any) {
  // Jika nilai adalah array, gabungkan elemen dengan " / ", jika kosong tampilkan "--"
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'

  // Jika bukan array, tampilkan nilai aslinya atau fallback ke "--" jika null/undefined
  return callValue ?? '--'
}

// Fungsi untuk mengambil nilai dari object `row` berdasarkan `prop`
// Contoh: jika prop = "user.name", maka akan mengambil `row.user.name`
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  // Jika prop bukan nested (tidak ada titik), langsung ambil dari row
  if (!prop.includes('.')) return row[prop] ?? '--'

  // Jika nested, pecah berdasarkan titik lalu telusuri satu per satu
  prop.split('.').forEach(item => {
    // Jika salah satu level tidak ada, fallback langsung ke "--"
    row = row[item] ?? '--'
  })

  // Hasil akhir adalah nilai setelah ditelusuri berdasarkan path
  return row
}

function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

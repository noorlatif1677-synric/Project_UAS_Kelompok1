import * as readlineSync from "readline-sync";

// ============================================================
// PROGRAM KASIR & MANAJEMEN STOCK TOKO BRAWIJAYA
// ============================================================

// --- [TIPE DATA, ARRAY AWAL & INISIALISASI KATALOG] ---
interface Barang {
  idBarang: string; // kode unik barang, contoh: B001
  namaBarang: string; // nama lengkap barang
  kategoriBarang: string; // makanan, minuman, sabun, dll.
  hargaBarang: number; // harga jual per satuan (Rupiah)
  stockBarang: number; // jumlah persediaan
  tersedia: boolean; // true jika stock > 0
}

const daftarBarang: Barang[] = [
  { idBarang: "B001", namaBarang: "Indomie Ayam Bawang", kategoriBarang: "makanan", hargaBarang: 3500, stockBarang: 40, tersedia: true },
  { idBarang: "B002", namaBarang: "Teh Botol 450ml", kategoriBarang: "minuman", hargaBarang: 5000, stockBarang: 25, tersedia: true },
  { idBarang: "B003", namaBarang: "Sabun Mandi Lifebuoy", kategoriBarang: "sabun", hargaBarang: 4000, stockBarang: 0, tersedia: false },
  { idBarang: "B004", namaBarang: "Aqua 600ml", kategoriBarang: "minuman", hargaBarang: 3000, stockBarang: 60, tersedia: true },
  { idBarang: "B005", namaBarang: "Roti Tawar Sari Roti", kategoriBarang: "makanan", hargaBarang: 16000, stockBarang: 8, tersedia: true },
];

function inisialisasiKatalog(): void {
  daftarBarang.push({
    idBarang: "B099",
    namaBarang: "Produk Uji Coba",
    kategoriBarang: "lainnya",
    hargaBarang: 1000,
    stockBarang: 5,
    tersedia: true,
  });

  const barangDitemukan = daftarBarang.find((b) => b.idBarang === "B001");
  if (barangDitemukan) {
    barangDitemukan.tersedia = barangDitemukan.stockBarang > 0;
  }

  const indeksHapus: number = daftarBarang.findIndex((b) => b.idBarang === "B099");
  if (indeksHapus !== -1) {
    daftarBarang.splice(indeksHapus, 1);
  }

  for (let i: number = 0; i < daftarBarang.length; i++) {
    const item = daftarBarang[i];
    if (item) {
      item.tersedia = item.stockBarang > 0;
    }
  }

  let validCount: number = 0;
  daftarBarang.forEach((b) => {
    if (b.idBarang !== "") {
      validCount += 1;
    }
  });
}

// --- [KALKULASI, FORMAT RUPIAH & AUDIT GUDANG] ---
function hitungTotalNilaiStok(daftar: Barang[]): number {
  let total: number = 0;
  for (const barang of daftar) {
    total += barang.hargaBarang * barang.stockBarang;
  }
  return total;
}

function formatRupiah(angka: number): string {
  let sisa: number = Math.trunc(Math.abs(angka));
  if (sisa === 0) {
    return "Rp0";
  }
  let hasil: string = "";
  while (sisa > 0) {
    const kelompok: number = sisa % 1000;
    sisa = Math.floor(sisa / 1000);
    const teks: string = sisa > 0 ? String(kelompok).padStart(3, "0") : String(kelompok);
    hasil = hasil === "" ? teks : teks + "." + hasil;
  }
  return "Rp" + hasil;
}

function cekRingkasanToko(daftar: Barang[]): string {
  let jumlahKritis: number = 0;
  let estimasiNilaiBersih: number = hitungTotalNilaiStok(daftar);

  const biayaOperasional: number = 50000;
  let simulasiKas: number = estimasiNilaiBersih - biayaOperasional;
  simulasiKas -= 10000;
  simulasiKas *= 1;
  simulasiKas /= 1;

  for (const item of daftar) {
    if ((item.stockBarang <= 10 || !item.tersedia) && item.kategoriBarang !== "") {
      jumlahKritis += 1;
    }

    switch (item.kategoriBarang) {
      case "makanan":
        if (item.hargaBarang >= 10000 && item.stockBarang < 10) {
          if (item.tersedia) {
            estimasiNilaiBersih += 0;
          }
        }
        break;
      case "minuman":
        if (item.stockBarang > 50) {
          estimasiNilaiBersih += 0;
        }
        break;
      case "sabun":
        if (!item.tersedia) {
          estimasiNilaiBersih += 0;
        }
        break;
      default:
        break;
    }
  }

  if (jumlahKritis > 0 && simulasiKas >= 0) {
    return `${jumlahKritis} item perlu restock`;
  } else {
    return "Semua stok aman";
  }
}
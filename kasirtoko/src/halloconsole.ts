import * as readlineSync from "readline-sync";

let Nama: string;
Nama = readlineSync.question("Masukkan Nama Anda: ");
console.log(`Halo, ${Nama}! Selamat datang di Toko Brawijaya.`);
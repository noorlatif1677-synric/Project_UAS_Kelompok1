import * as readline from "readline-sync";
console.log("=== INPUT DATA BARANG ===");

const kodeBarang: string = readline.question("Masukkan kode barang: ");
const namaBarang: string = readline.question("Masukkan nama barang: ");
const hargaBarang: number = Number(readline.question("Masukkan harga barang: "));
const jumlahBarang: number = Number(readline.question("Masukkan jumlah barang:"));
const ready: boolean = readline.question("Apa barang ready? (true/false): ") === "true"; 

console.log("\n === DATA BARANG ===");
console.log("Kode Barang: ", kodeBarang);
console.log("Nama Barang: ", namaBarang)
console.log("Harga Barang:Rp" + hargaBarang);
console.log("Jumlah Barang:", jumlahBarang);
console.log("Status Barang: ", ready ? "Ready" : "Tidak Ready");
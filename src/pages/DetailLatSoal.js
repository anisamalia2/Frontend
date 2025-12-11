import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// All exercises questions mapped by exercise id. Added sets based on user-provided content.
const allSoal = {
  // Bahasa Indonesia
  101: {
    id: 101,
    title: "Teks deskripsi - Kelas 4 SD",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Teks deskripsi biasanya menggambarkan…", options: [
        { label: "A", text: "Peristiwa masa depan" },
        { label: "B", text: "Keadaan suatu tempat" },
        { label: "C", text: "Cara membuat sesuatu" },
        { label: "D", text: "Cerita fantasi" },
      ], correct: "B", explanation: "Teks deskripsi memberikan gambaran tentang keadaan suatu tempat, suasana, atau benda." },
      { id: 2, question: "Kalimat berikut yang merupakan kalimat deskripsi adalah…", options: [
        { label: "A", text: "Ayo kita pergi ke taman besok!" },
        { label: "B", text: "Aku suka membaca buku setiap hari." },
        { label: "C", text: "Taman itu penuh bunga warna-warni dan pepohonan hijau." },
        { label: "D", text: "Jika ingin sehat, kita harus berolahraga." },
      ], correct: "C", explanation: "Kalimat C menggambarkan keadaan taman secara visual." },
      { id: 3, question: "Teks deskripsi lingkungan bertujuan untuk…", options: [
        { label: "A", text: "Mengajak pembaca melakukan sesuatu" },
        { label: "B", text: "Menjelaskan langkah-langkah membuat sesuatu" },
        { label: "C", text: "Menggambarkan suasana atau keadaan lingkungan" },
        { label: "D", text: "Menceritakan pengalaman pribadi" },
      ], correct: "C", explanation: "Tujuan teks deskripsi adalah menggambarkan suasana atau keadaan lingkungan." },
      { id: 4, question: "Bagian dari teks deskripsi yang berisi penjelasan detail tentang objek adalah…", options: [
        { label: "A", text: "Kesimpulan" },
        { label: "B", text: "Orientasi" },
        { label: "C", text: "Identifikasi" },
        { label: "D", text: "Deskripsi bagian" },
      ], correct: "D", explanation: "Deskripsi bagian memuat uraian rinci mengenai ciri-ciri objek." },
      { id: 5, question: "“Pasar itu ramai, pedagang dan pembeli saling berinteraksi.” Kalimat tersebut menggambarkan…", options: [
        { label: "A", text: "Suasana pasar" },
        { label: "B", text: "Bentuk pasar" },
        { label: "C", text: "Lokasi pasar" },
        { label: "D", text: "Harga barang di pasar" },
      ], correct: "A", explanation: "Kata 'ramai' menunjukkan suasana atau keadaan pasar." },
      { id: 6, question: "Ciri utama teks deskripsi adalah…", options: [
        { label: "A", text: "Menggunakan bahasa formal" },
        { label: "B", text: "Mengandung dialog antar tokoh" },
        { label: "C", text: "Menggunakan kata sifat atau kata indra" },
        { label: "D", text: "Berisi langkah-langkah" },
      ], correct: "C", explanation: "Teks deskripsi menggunakan kata sifat dan istilah pancaindra." },
      { id: 7, question: "Contoh tempat yang bisa dideskripsikan dalam teks deskripsi lingkungan adalah…", options: [
        { label: "A", text: "Dongeng" },
        { label: "B", text: "Taman sekolah" },
        { label: "C", text: "Cerita rakyat" },
        { label: "D", text: "Pantun" },
      ], correct: "B", explanation: "Taman sekolah adalah tempat nyata yang bisa dideskripsikan." },
      { id: 8, question: "Kata yang termasuk kata indra dalam teks deskripsi adalah…", options: [
        { label: "A", text: "Cantik" },
        { label: "B", text: "Mendengar" },
        { label: "C", text: "Berlari" },
        { label: "D", text: "Bermain" },
      ], correct: "B", explanation: 'Mendengar berkaitan dengan indra pendengaran sehingga termasuk kata indra.' },
      { id: 9, question: "Jika kamu menulis tentang “halaman rumah”, maka yang bisa dideskripsikan adalah…", options: [
        { label: "A", text: "Warna dinding kamar tidur" },
        { label: "B", text: "Makanan yang kamu sukai" },
        { label: "C", text: "Rumput, tanaman, dan suasananya" },
        { label: "D", text: "Lagu kesukaanmu" },
      ], correct: "C", explanation: "Deskripsi halaman rumah meliputi rumput, tanaman, dan suasana sekitar." },
      { id: 10, question: "Kalimat deskripsi berikut yang menggambarkan sungai adalah…", options: [
        { label: "A", text: "Sungai itu mengalir deras dan airnya tampak jernih kehijauan." },
        { label: "B", text: "Aku dan teman-teman bermain di sungai kemarin." },
        { label: "C", text: "Jika kamu ke sungai, berhati-hatilah!" },
        { label: "D", text: "Ayo kita menjaga kebersihan sungai!" },
      ], correct: "A", explanation: "Kalimat A menggambarkan kondisi sungai secara visual." },
    ],
  },

  102: {
    id: 102,
    title: "Gagasan Pokok & Pendukung - Kelas 5 SD",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Gagasan pokok adalah…", options: [
        { label: "A", text: "Contoh-contoh dalam paragraf" },
        { label: "B", text: "Ide utama yang dibahas dalam paragraf" },
        { label: "C", text: "Kalimat terakhir paragraf" },
        { label: "D", text: "Kalimat tanya dalam paragraf" },
      ], correct: "B", explanation: "Gagasan pokok adalah inti atau ide utama paragraf." },
      { id: 2, question: "Gagasan pendukung adalah…", options: [
        { label: "A", text: "Kalimat yang memperkuat dan menjelaskan gagasan pokok" },
        { label: "B", text: "Kalimat yang tidak berkaitan dengan gagasan pokok" },
        { label: "C", text: "Kalimat yang berisi dialog" },
        { label: "D", text: "Kalimat yang selalu berada di awal paragraf" },
      ], correct: "A", explanation: "Gagasan pendukung menjelaskan atau memperkuat gagasan pokok." },
      { id: 3, question: "Perhatikan paragraf: 'Sekolahku memiliki halaman yang sangat luas...'. Gagasan pokoknya adalah…", options: [
        { label: "A", text: "Banyaknya tanaman hijau" },
        { label: "B", text: "Petugas kebersihan sekolah" },
        { label: "C", text: "Halaman sekolah yang luas" },
        { label: "D", text: "Halaman selalu disapu" },
      ], correct: "C", explanation: "Kalimat pertama menyatakan ide utama: halaman sekolah yang luas." },
      { id: 4, question: "Kalimat yang termasuk gagasan pendukung adalah…", options: [
        { label: "A", text: "Kalimat yang menjelaskan gagasan pokok" },
        { label: "B", text: "Kalimat yang berdiri sendiri" },
        { label: "C", text: "Kalimat yang tidak penting" },
        { label: "D", text: "Kalimat yang hanya berisi perintah" },
      ], correct: "A", explanation: "Gagasan pendukung memberikan detail tambahan tentang gagasan pokok." },
      { id: 5, question: "Perpustakaan adalah tempat favoritku... Gagasan pokoknya adalah…", options: [
        { label: "A", text: "Ruangan perpustakaan sejuk" },
        { label: "B", text: "Perpustakaan adalah tempat favorit" },
        { label: "C", text: "Banyak majalah di perpustakaan" },
        { label: "D", text: "Banyak ensiklopedia di perpustakaan" },
      ], correct: "B", explanation: "Kalimat pertama menyatakan ide utama: perpustakaan adalah tempat favorit." },
      { id: 6, question: "Paragraf yang baik memiliki…", options: [
        { label: "A", text: "Banyak kata sulit" },
        { label: "B", text: "Gagasan pokok dan gagasan pendukung yang saling berkaitan" },
        { label: "C", text: "Gagasan pokok yang tidak jelas" },
        { label: "D", text: "Kalimat yang sangat panjang" },
      ], correct: "B", explanation: "Paragraf yang padu memiliki gagasan pokok dan pendukung yang saling berkaitan." },
      { id: 7, question: "Perhatikan paragraf tentang pasar pagi... Gagasan pendukung yang sesuai adalah…", options: [
        { label: "A", text: "Pasar pagi sangat ramai" },
        { label: "B", text: "Banyak warga berbelanja setiap hari" },
        { label: "C", text: "Pasar terletak sangat jauh dari rumah" },
        { label: "D", text: "Pedagang tidak menjual makanan" },
      ], correct: "B", explanation: "Kalimat 'banyak warga berbelanja setiap hari' mendukung gagasan pokok tentang keramaian pasar." },
      { id: 8, question: "Letak gagasan pokok paling sering ditemukan pada…", options: [
        { label: "A", text: "Akhir paragraf" },
        { label: "B", text: "Tengah paragraf" },
        { label: "C", text: "Awal paragraf" },
        { label: "D", text: "Di luar paragraf" },
      ], correct: "C", explanation: "Sering kali gagasan pokok diletakkan di awal paragraf." },
      { id: 9, question: "Perhatikan paragraf tentang lapangan desa... Gagasan pokoknya adalah…", options: [
        { label: "A", text: "Lapangan digunakan untuk upacara" },
        { label: "B", text: "Anak-anak bermain sepak bola" },
        { label: "C", text: "Lapangan di desa sangat luas" },
        { label: "D", text: "Lapangan digunakan untuk acara desa" },
      ], correct: "C", explanation: "Kalimat pertama berisi gagasan pokok: lapangan yang luas." },
      { id: 10, question: "Gagasan pendukung yang baik harus…", options: [
        { label: "A", text: "Tidak berhubungan dengan gagasan pokok" },
        { label: "B", text: "Menjelaskan gagasan pokok dengan lebih rinci" },
        { label: "C", text: "Berisi hal yang tidak penting" },
        { label: "D", text: "Berasal dari paragraf lain" },
      ], correct: "B", explanation: "Gagasan pendukung berfungsi menjelaskan dan memperjelas gagasan pokok." },
    ],
  },

  // Matematika - Kelas 3 SD
  201: {
    id: 201,
    title: "Operasi Hitung Bilangan Cacah - Kelas 3 SD",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Hasil dari 345 + 120 adalah…", options: [
        { label: "A", text: "455" },
        { label: "B", text: "465" },
        { label: "C", text: "475" },
        { label: "D", text: "485" },
      ], correct: "B", explanation: "345 + 120 = 465." },
      { id: 2, question: "Hasil dari 900 – 235 adalah…", options: [
        { label: "A", text: "655" },
        { label: "B", text: "665" },
        { label: "C", text: "675" },
        { label: "D", text: "685" },
      ], correct: "B", explanation: "900 - 235 = 665." },
      { id: 3, question: "45 × 2 = …", options: [
        { label: "A", text: "90" },
        { label: "B", text: "80" },
        { label: "C", text: "70" },
        { label: "D", text: "60" },
      ], correct: "A", explanation: "45 × 2 = 90." },
      { id: 4, question: "144 : 12 = …", options: [
        { label: "A", text: "10" },
        { label: "B", text: "11" },
        { label: "C", text: "12" },
        { label: "D", text: "13" },
      ], correct: "C", explanation: "144 ÷ 12 = 12." },
      { id: 5, question: "Hasil dari 1.250 + 300 – 150 adalah…", options: [
        { label: "A", text: "1.300" },
        { label: "B", text: "1.350" },
        { label: "C", text: "1.400" },
        { label: "D", text: "1.450" },
      ], correct: "C", explanation: "1250 + 300 - 150 = 1400." },
      { id: 6, question: "600 – (250 + 100) = …", options: [
        { label: "A", text: "150" },
        { label: "B", text: "200" },
        { label: "C", text: "250" },
        { label: "D", text: "300" },
      ], correct: "C", explanation: "600 - (250+100) = 600 - 350 = 250." },
      { id: 7, question: "Hasil dari 32 × 4 adalah…", options: [
        { label: "A", text: "108" },
        { label: "B", text: "118" },
        { label: "C", text: "128" },
        { label: "D", text: "138" },
      ], correct: "C", explanation: "32 × 4 = 128." },
      { id: 8, question: "500 : 5 = …", options: [
        { label: "A", text: "50" },
        { label: "B", text: "75" },
        { label: "C", text: "90" },
        { label: "D", text: "100" },
      ], correct: "D", explanation: "500 ÷ 5 = 100." },
      { id: 9, question: "Rani membeli 3 bungkus pensil. Setiap bungkus berisi 12 pensil. Jadi jumlah pensil Rani adalah…", options: [
        { label: "A", text: "24" },
        { label: "B", text: "30" },
        { label: "C", text: "32" },
        { label: "D", text: "36" },
      ], correct: "D", explanation: "3 × 12 = 36." },
      { id: 10, question: "800 – 240 + 100 = …", options: [
        { label: "A", text: "640" },
        { label: "B", text: "660" },
        { label: "C", text: "680" },
        { label: "D", text: "700" },
      ], correct: "B", explanation: "800 - 240 + 100 = 660." },
    ],
  },

  // Matematika - Kelas 4 SD (Pecahan)
  202: {
    id: 202,
    title: "Pecahan - Kelas 4 SD",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Pecahan 1/2 dibaca…", options: [
        { label: "A", text: "Satu bagi dua" },
        { label: "B", text: "Satu per dua" },
        { label: "C", text: "Satu dua" },
        { label: "D", text: "Dua per satu" },
      ], correct: "B", explanation: "1/2 dibaca 'satu per dua'." },
      { id: 2, question: "Gambar kue dibagi 4 dan 1 diarsir. Pecahannya…", options: [
        { label: "A", text: "1/4" },
        { label: "B", text: "1/3" },
        { label: "C", text: "1/2" },
        { label: "D", text: "1/5" },
      ], correct: "A", explanation: "1 bagian dari 4 = 1/4." },
      { id: 3, question: "Pecahan yang nilainya paling besar adalah…", options: [
        { label: "A", text: "1/4" },
        { label: "B", text: "1/3" },
        { label: "C", text: "1/2" },
        { label: "D", text: "1/5" },
      ], correct: "C", explanation: "1/2 memiliki nilai terbesar di antara pilihan." },
      { id: 4, question: "Garis dibagi 2 bagian, satu diwarnai. Pecahannya…", options: [
        { label: "A", text: "1/2" },
        { label: "B", text: "2/2" },
        { label: "C", text: "1/3" },
        { label: "D", text: "2/3" },
      ], correct: "A", explanation: "1 bagian dari 2 = 1/2." },
      { id: 5, question: "Pecahan yang menunjukkan tiga bagian dari lima adalah…", options: [
        { label: "A", text: "3/2" },
        { label: "B", text: "1/5" },
        { label: "C", text: "3/5" },
        { label: "D", text: "5/3" },
      ], correct: "C", explanation: "Tiga bagian dari lima = 3/5." },
      { id: 6, question: "Lingkaran dibagi 8, 4 diarsir. Pecahannya…", options: [
        { label: "A", text: "4/4" },
        { label: "B", text: "1/8" },
        { label: "C", text: "4/8" },
        { label: "D", text: "8/4" },
      ], correct: "C", explanation: "4 dari 8 = 4/8." },
      { id: 7, question: "2/4 sama nilainya dengan…", options: [
        { label: "A", text: "1/2" },
        { label: "B", text: "1/4" },
        { label: "C", text: "3/4" },
        { label: "D", text: "2/3" },
      ], correct: "A", explanation: "2/4 = 1/2 setelah disederhanakan." },
      { id: 8, question: "Pecahan 5/5 nilainya sama dengan…", options: [
        { label: "A", text: "1" },
        { label: "B", text: "5" },
        { label: "C", text: "0" },
        { label: "D", text: "1/5" },
      ], correct: "A", explanation: "Pembilang = penyebut → nilai 1." },
      { id: 9, question: "Persegi dibagi 6 bagian, 2 diwarnai. Pecahannya…", options: [
        { label: "A", text: "2/3" },
        { label: "B", text: "1/3" },
        { label: "C", text: "2/6" },
        { label: "D", text: "3/6" },
      ], correct: "C", explanation: "2 dari 6 = 2/6." },
      { id: 10, question: "Pecahan yang menunjukkan bagian paling kecil adalah…", options: [
        { label: "A", text: "1/2" },
        { label: "B", text: "1/3" },
        { label: "C", text: "1/4" },
        { label: "D", text: "1/5" },
      ], correct: "D", explanation: "1/5 lebih kecil dibanding 1/2, 1/3, dan 1/4." },
    ],
  },

  // IPA
  301: {
    id: 301,
    title: "IPA - Kelas 4 SD",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Hewan termasuk makhluk hidup karena dapat…", options: [
        { label: "A", text: "Bernafas" },
        { label: "B", text: "Membaca" },
        { label: "C", text: "Menulis" },
        { label: "D", text: "Menggambar" },
      ], correct: "A", explanation: "Bernafas adalah ciri makhluk hidup." },
      { id: 2, question: "Tumbuhan dapat membuat makanannya sendiri melalui proses…", options: [
        { label: "A", text: "Pernafasan" },
        { label: "B", text: "Fotosintesis" },
        { label: "C", text: "Penyerapan tanah" },
        { label: "D", text: "Perpindahan tempat" },
      ], correct: "B", explanation: "Fotosintesis membuat makanan pada tumbuhan." },
      { id: 3, question: "Makhluk hidup dikelompokkan berdasarkan…", options: [
        { label: "A", text: "Warna kesukaan" },
        { label: "B", text: "Ciri-ciri yang dimiliki" },
        { label: "C", text: "Nama panggilan" },
        { label: "D", text: "Tempat membeli" },
      ], correct: "B", explanation: "Pengelompokan berdasarkan ciri-ciri." },
      { id: 4, question: "Hewan yang berkembang biak dengan cara bertelur adalah…", options: [
        { label: "A", text: "Kucing" },
        { label: "B", text: "Sapi" },
        { label: "C", text: "Ayam" },
        { label: "D", text: "Kambing" },
      ], correct: "C", explanation: "Ayam berkembang biak bertelur." },
      { id: 5, question: "Tumbuhan yang berakar serabut adalah…", options: [
        { label: "A", text: "Mangga" },
        { label: "B", text: "Padi" },
        { label: "C", text: "Jambu" },
        { label: "D", text: "Rambutan" },
      ], correct: "B", explanation: "Padi memiliki akar serabut." },
      { id: 6, question: "Contoh hewan vertebrata adalah…", options: [
        { label: "A", text: "Cacing" },
        { label: "B", text: "Ikan" },
        { label: "C", text: "Serangga" },
        { label: "D", text: "Siput" },
      ], correct: "B", explanation: "Ikan termasuk hewan vertebrata (bertulang belakang)." },
      { id: 7, question: "Gerak pada tumbuhan ditunjukkan oleh…", options: [
        { label: "A", text: "Tumbuhan berjalan ke matahari" },
        { label: "B", text: "Daun putri malu mengatup ketika disentuh" },
        { label: "C", text: "Bunga bergerak mencari makan" },
        { label: "D", text: "Akar tumbuhan menangkap serangga" },
      ], correct: "B", explanation: "Daun putri malu menutup saat disentuh, contoh gerak tumbuhan." },
      { id: 8, question: "Tumbuhan berbiji berkeping dua (dikotil) memiliki ciri…", options: [
        { label: "A", text: "Daunnya sejajar" },
        { label: "B", text: "Akarnya tunggang" },
        { label: "C", text: "Bunganya kecil" },
        { label: "D", text: "Tidak memiliki akar" },
      ], correct: "B", explanation: "Dikotil biasanya memiliki akar tunggang." },
      { id: 9, question: "Hewan invertebrata adalah hewan yang…", options: [
        { label: "A", text: "Tidak memiliki tulang belakang" },
        { label: "B", text: "Memiliki tulang belakang" },
        { label: "C", text: "Hidup di darat saja" },
        { label: "D", text: "Hidup di air saja" },
      ], correct: "A", explanation: "Invertebrata tidak memiliki tulang belakang." },
      { id: 10, question: "Contoh makhluk hidup yang bernafas dengan insang adalah…", options: [
        { label: "A", text: "Kucing" },
        { label: "B", text: "Ayam" },
        { label: "C", text: "Ikan" },
        { label: "D", text: "Kuda" },
      ], correct: "C", explanation: "Ikan bernafas dengan insang." },
    ],
  },

  302: {
    id: 302,
    title: "IPA - Kelas 6 SD (Gaya)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Gaya adalah…", options: [
        { label: "A", text: "Perubahan warna benda" },
        { label: "B", text: "Tarikan atau dorongan terhadap suatu benda" },
        { label: "C", text: "Suara yang berasal dari benda" },
        { label: "D", text: "Bentuk benda yang berubah" },
      ], correct: "B", explanation: "Gaya adalah tarikan atau dorongan terhadap benda." },
      { id: 2, question: "Contoh gaya otot dalam kehidupan sehari-hari adalah…", options: [
        { label: "A", text: "Magnet menarik paku" },
        { label: "B", text: "Angin meniup dedaunan" },
        { label: "C", text: "Seseorang mengangkat tas" },
        { label: "D", text: "Bola jatuh ke tanah" },
      ], correct: "C", explanation: "Mengangkat tas menggunakan gaya otot." },
      { id: 3, question: "Gaya dapat mengubah…", options: [
        { label: "A", text: "Nama benda" },
        { label: "B", text: "Jenis benda" },
        { label: "C", text: "Bentuk dan arah gerak benda" },
        { label: "D", text: "Warna benda" },
      ], correct: "C", explanation: "Gaya dapat mengubah bentuk dan arah gerak benda." },
      { id: 4, question: "Ketika sepeda direm, gaya yang bekerja adalah gaya…", options: [
        { label: "A", text: "Gaya gesek" },
        { label: "B", text: "Gaya magnet" },
        { label: "C", text: "Gaya gravitasi" },
        { label: "D", text: "Gaya listrik" },
      ], correct: "A", explanation: "Rem bekerja dengan gaya gesek." },
      { id: 5, question: "Gaya gravitasi adalah gaya yang menyebabkan…", options: [
        { label: "A", text: "Benda melayang ke atas" },
        { label: "B", text: "Benda bergerak ke samping" },
        { label: "C", text: "Benda jatuh ke bawah" },
        { label: "D", text: "Benda berhenti total" },
      ], correct: "C", explanation: "Gravitasi membuat benda jatuh ke bawah." },
      { id: 6, question: "Contoh gaya magnet adalah…", options: [
        { label: "A", text: "Tangan menendang bola" },
        { label: "B", text: "Pintu dibuka" },
        { label: "C", text: "Magnet menarik penjepit kertas" },
        { label: "D", text: "Batu jatuh ke tanah" },
      ], correct: "C", explanation: "Magnet menarik benda yang bersifat ferromagnetik." },
      { id: 7, question: "Ketika angin meniup layar kapal hingga kapal bergerak, gaya yang bekerja adalah…", options: [
        { label: "A", text: "Gaya gesek" },
        { label: "B", text: "Gaya pegas" },
        { label: "C", text: "Gaya otot" },
        { label: "D", text: "Gaya angin" },
      ], correct: "D", explanation: "Angin memberi dorongan (gaya angin) pada layar." },
      { id: 8, question: "Gaya gesek dapat menyebabkan permukaan benda menjadi…", options: [
        { label: "A", text: "Basah" },
        { label: "B", text: "Panas" },
        { label: "C", text: "Berbunyi" },
        { label: "D", text: "Lebih lembut" },
      ], correct: "B", explanation: "Gesekan dapat menghasilkan panas." },
      { id: 9, question: "Pegas pada ketapel dapat menggerakkan batu ketika…", options: [
        { label: "A", text: "Ditarik lalu dilepas" },
        { label: "B", text: "Ditendang" },
        { label: "C", text: "Disiram air" },
        { label: "D", text: "Ditaruh di tanah" },
      ], correct: "A", explanation: "Pegas diberi energi ketika ditarik dan melepaskan energi saat dilepas." },
      { id: 10, question: "Contoh gaya yang menyebabkan perubahan bentuk benda adalah…", options: [
        { label: "A", text: "Memukul bola hingga bergerak" },
        { label: "B", text: "Menekan spons hingga pipih" },
        { label: "C", text: "Magnet menarik uang logam" },
        { label: "D", text: "Angin mendorong daun jatuh" },
      ], correct: "B", explanation: "Menekan spons mengubah bentuknya." },
    ],
  },

  // Bahasa Inggris
  401: {
    id: 401,
    title: "Bahasa Inggris - Kelas 5",
    totalSoal: 10,
    questions: [
      { id: 1, question: "“She has long black hair.” Kalimat tersebut menggambarkan…", options: [
        { label: "A", text: "Hobi seseorang" },
        { label: "B", text: "Ciri fisik seseorang" },
        { label: "C", text: "Pekerjaan seseorang" },
        { label: "D", text: "Umur seseorang" },
      ], correct: "B", explanation: "Kalimat menggambarkan ciri fisik: rambut panjang berwarna hitam." },
      { id: 2, question: "The word “tall” means…", options: [
        { label: "A", text: "Pendek" },
        { label: "B", text: "Tinggi" },
        { label: "C", text: "Gemuk" },
        { label: "D", text: "Kecil" },
      ], correct: "B", explanation: "'Tall' berarti tinggi." },
      { id: 3, question: "“The cat is white and has blue eyes.” Kalimat tersebut menggambarkan…", options: [
        { label: "A", text: "Warna dan ciri kucing" },
        { label: "B", text: "Makanan kucing" },
        { label: "C", text: "Tempat tinggal kucing" },
        { label: "D", text: "Ukuran kandang kucing" },
      ], correct: "A", explanation: "Kalimat menjelaskan warna dan ciri kucing." },
      { id: 4, question: "Which sentence describes a person?", options: [
        { label: "A", text: "The bird can fly very high." },
        { label: "B", text: "The boy has a round face." },
        { label: "C", text: "The car is very fast." },
        { label: "D", text: "The dog is barking loudly." },
      ], correct: "B", explanation: "Kalimat B mendeskripsikan ciri fisik seorang anak." },
      { id: 5, question: "“It has four wheels and is red.” Benda yang dimaksud adalah…", options: [
        { label: "A", text: "A book" },
        { label: "B", text: "A bicycle" },
        { label: "C", text: "A car" },
        { label: "D", text: "A bag" },
      ], correct: "C", explanation: "Mobil memiliki empat roda dan bisa berwarna merah." },
      { id: 6, question: "“My mother is kind and helpful.” Kata “kind” berarti…", options: [
        { label: "A", text: "Baik hati" },
        { label: "B", text: "Marah" },
        { label: "C", text: "Cepat" },
        { label: "D", text: "Pelan" },
      ], correct: "A", explanation: "'Kind' berarti baik hati." },
      { id: 7, question: "“The elephant is very big.” Kata “big” berarti…", options: [
        { label: "A", text: "Kecil" },
        { label: "B", text: "Besar" },
        { label: "C", text: "Tipis" },
        { label: "D", text: "Pendek" },
      ], correct: "B", explanation: "'Big' berarti besar." },
      { id: 8, question: "Which one describes an animal?", options: [
        { label: "A", text: "My sister is very smart." },
        { label: "B", text: "The table is made of wood." },
        { label: "C", text: "The rabbit has long ears." },
        { label: "D", text: "The boy wears a hat." },
      ], correct: "C", explanation: "Kalimat C menggambarkan ciri rabbit sebagai hewan." },
      { id: 9, question: "“He is wearing a blue T-shirt.” Kalimat tersebut menggambarkan…", options: [
        { label: "A", text: "Pekerjaan" },
        { label: "B", text: "Hobi" },
        { label: "C", text: "Apa yang dipakai" },
        { label: "D", text: "Makanan favorit" },
      ], correct: "C", explanation: "Kalimat menerangkan pakaian yang dipakai." },
      { id: 10, question: "“The bag is heavy.” Kata “heavy” berarti…", options: [
        { label: "A", text: "Ringan" },
        { label: "B", text: "Berat" },
        { label: "C", text: "Baru" },
        { label: "D", text: "Lama" },
      ], correct: "B", explanation: "'Heavy' berarti berat." },
    ],
  },

  402: {
    id: 402,
    title: "Bahasa Inggris - Kelas 7 SMP (Directions)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "What does 'Excuse me, how do I get to the museum?' express?", options: [
        { label: "A", text: "Giving information" },
        { label: "B", text: "Asking for directions" },
        { label: "C", text: "Giving permission" },
        { label: "D", text: "Asking for help with homework" },
      ], correct: "B", explanation: "Kalimat tersebut meminta petunjuk arah." },
      { id: 2, question: "'Go straight ahead' means…", options: [
        { label: "A", text: "Belok kanan" },
        { label: "B", text: "Belok kiri" },
        { label: "C", text: "Jalan lurus ke depan" },
        { label: "D", text: "Putar balik" },
      ], correct: "C", explanation: "'Go straight ahead' berarti jalan lurus ke depan." },
      { id: 3, question: "Someone says, 'Turn left at the corner.' It means you should…", options: [
        { label: "A", text: "Berjalan lurus" },
        { label: "B", text: "Belok kiri di tikungan" },
        { label: "C", text: "Belok kanan di lampu merah" },
        { label: "D", text: "Berjalan mundur" },
      ], correct: "B", explanation: "'Turn left at the corner' = belok kiri di tikungan." },
      { id: 4, question: "'Can you show me the way to the library?' is used to…", options: [
        { label: "A", text: "Meminta tolong membawa barang" },
        { label: "B", text: "Menanyakan waktu" },
        { label: "C", text: "Meminta arah jalan" },
        { label: "D", text: "Menanyakan harga buku" },
      ], correct: "C", explanation: "Kalimat tersebut menanyakan arah." },
      { id: 5, question: "The correct response to 'Where is the post office?' is…", options: [
        { label: "A", text: "It's next to the bank." },
        { label: "B", text: "I like the post office." },
        { label: "C", text: "Yes, I can." },
        { label: "D", text: "No, thanks." },
      ], correct: "A", explanation: "Menunjukkan lokasi relatif: di sebelah bank." },
      { id: 6, question: "'Across from' means…", options: [
        { label: "A", text: "Di sebelah" },
        { label: "B", text: "Di belakang" },
        { label: "C", text: "Di depan/berhadapan" },
        { label: "D", text: "Di atas" },
      ], correct: "C", explanation: "'Across from' = berhadapan/lokasi di seberang." },
      { id: 7, question: "Which sentence is used to GIVE directions?", options: [
        { label: "A", text: "Where is the hospital?" },
        { label: "B", text: "Could you help me?" },
        { label: "C", text: "Go past the school, then turn right." },
        { label: "D", text: "What time is it?" },
      ], correct: "C", explanation: "Kalimat C memberikan petunjuk arah." },
      { id: 8, question: "'The bookstore is behind the supermarket.' The word 'behind' means…", options: [
        { label: "A", text: "Di depan" },
        { label: "B", text: "Di samping" },
        { label: "C", text: "Di belakang" },
        { label: "D", text: "Di tengah" },
      ], correct: "C", explanation: "'Behind' = di belakang." },
      { id: 9, question: "A tourist asks, 'Is the park far from here?' You answer…", options: [
        { label: "A", text: "Yes, I am fine." },
        { label: "B", text: "The park is about 10 minutes from here." },
        { label: "C", text: "I don't like parks." },
        { label: "D", text: "Let's go shopping." },
      ], correct: "B", explanation: "Jawaban B memberikan perkiraan jarak/ waktu." },
      { id: 10, question: "'Follow this road until you reach the traffic light.' It means…", options: [
        { label: "A", text: "Ikuti jalan ini sampai lampu lalu lintas" },
        { label: "B", text: "Putar balik di jalan ini" },
        { label: "C", text: "Berjalan cepat ke arah berlawanan" },
        { label: "D", text: "Berhenti di depan rumah" },
      ], correct: "A", explanation: "Kalimat tersebut menginstruksikan mengikuti jalan hingga lampu lalu lintas." },
    ],
  },

  // IPS (examples)
  501: {
    id: 501,
    title: "IPS - Kelas 4 SD (Kegiatan Ekonomi)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Kegiatan ekonomi adalah…", options: [
        { label: "A", text: "Kegiatan untuk bermain" },
        { label: "B", text: "Kegiatan menghasilkan dan memenuhi kebutuhan hidup" },
        { label: "C", text: "Kegiatan yang hanya dilakukan di sekolah" },
        { label: "D", text: "Kegiatan menjaga kesehatan tubuh" },
      ], correct: "B", explanation: "Kegiatan ekonomi berkaitan dengan produksi, distribusi, dan konsumsi." },
      { id: 2, question: "Contoh kegiatan produksi adalah…", options: [
        { label: "A", text: "Membeli sayur di pasar" },
        { label: "B", text: "Menjual buku" },
        { label: "C", text: "Menanam padi di sawah" },
        { label: "D", text: "Menggunakan sepeda" },
      ], correct: "C", explanation: "Menanam padi adalah kegiatan menghasilkan barang." },
      { id: 3, question: "Kegiatan menjual barang kepada pembeli disebut…", options: [
        { label: "A", text: "Produksi" },
        { label: "B", text: "Distribusi" },
        { label: "C", text: "Konsumsi" },
        { label: "D", text: "Transportasi" },
      ], correct: "B", explanation: "Distribusi menyalurkan barang ke konsumen." },
      { id: 4, question: "Kegiatan konsumsi dilakukan untuk…", options: [
        { label: "A", text: "Menghabiskan waktu" },
        { label: "B", text: "Memakai atau menggunakan barang" },
        { label: "C", text: "Menjual barang" },
        { label: "D", text: "Mengangkut barang" },
      ], correct: "B", explanation: "Konsumsi berarti memakai atau menggunakan barang." },
      { id: 5, question: "Contoh pemanfaatan sumber daya alam yang dapat diperbarui adalah…", options: [
        { label: "A", text: "Batu bara" },
        { label: "B", text: "Minyak bumi" },
        { label: "C", text: "Air" },
        { label: "D", text: "Gas alam" },
      ], correct: "C", explanation: "Air termasuk sumber daya yang dapat diperbarui." },
      { id: 6, question: "Nelayan termasuk pelaku kegiatan ekonomi di bidang…", options: [
        { label: "A", text: "Pertambangan" },
        { label: "B", text: "Perikanan" },
        { label: "C", text: "Peternakan" },
        { label: "D", text: "Perkebunan" },
      ], correct: "B", explanation: "Nelayan bekerja di sektor perikanan." },
      { id: 7, question: "Contoh sumber daya alam yang tidak dapat diperbarui adalah…", options: [
        { label: "A", text: "Kayu" },
        { label: "B", text: "Matahari" },
        { label: "C", text: "Minyak bumi" },
        { label: "D", text: "Hewan ternak" },
      ], correct: "C", explanation: "Minyak bumi adalah sumber daya tak terbarukan." },
      { id: 8, question: "Petani kopi bekerja di bidang…", options: [
        { label: "A", text: "Perkebunan" },
        { label: "B", text: "Perikanan" },
        { label: "C", text: "Perindustrian" },
        { label: "D", text: "Transportasi" },
      ], correct: "A", explanation: "Petani bekerja pada sektor perkebunan." },
      { id: 9, question: "Kegiatan ekonomi yang dilakukan pedagang adalah…", options: [
        { label: "A", text: "Menggunakan barang" },
        { label: "B", text: "Menjual dan membeli barang" },
        { label: "C", text: "Membuat barang" },
        { label: "D", text: "Menanam tanaman" },
      ], correct: "B", explanation: "Pedagang menjual dan membeli barang." },
      { id: 10, question: "Menghemat sumber daya alam dapat dilakukan dengan cara…", options: [
        { label: "A", text: "Menggunakan air berlebihan" },
        { label: "B", text: "Menebang pohon sembarangan" },
        { label: "C", text: "Menggunakan listrik seperlunya" },
        { label: "D", text: "Membuang sampah ke sungai" },
      ], correct: "C", explanation: "Menghemat listrik dan sumber daya lainnya membantu konservasi." },
    ],
  },

  502: {
    id: 502,
    title: "IPS - Kelas 7 SMP (Interaksi Sosial)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Interaksi sosial adalah…", options: [
        { label: "A", text: "Hubungan antara manusia dan hewan" },
        { label: "B", text: "Hubungan timbal balik antara dua orang atau lebih" },
        { label: "C", text: "Hubungan manusia dengan lingkungan alam" },
        { label: "D", text: "Hubungan manusia dengan benda mati" },
      ], correct: "B", explanation: "Interaksi sosial melibatkan hubungan timbal balik antar manusia." },
      { id: 2, question: "Syarat terjadinya interaksi sosial adalah…", options: [
        { label: "A", text: "Komunikasi dan kontak sosial" },
        { label: "B", text: "Pendidikan yang tinggi" },
        { label: "C", text: "Kekayaan dan status sosial" },
        { label: "D", text: "Tempat tinggal yang sama" },
      ], correct: "A", explanation: "Interaksi memerlukan komunikasi dan kontak sosial." },
      { id: 3, question: "Contoh kontak sosial langsung adalah…", options: [
        { label: "A", text: "Mengirim pesan lewat internet" },
        { label: "B", text: "Melambaikan tangan kepada teman" },
        { label: "C", text: "Bertatap muka dan berbicara langsung" },
        { label: "D", text: "Mengirim surat" },
      ], correct: "C", explanation: "Bertatap muka termasuk kontak sosial langsung." },
      { id: 4, question: "Mengucapkan salam kepada guru saat bertemu adalah contoh interaksi sosial berupa…", options: [
        { label: "A", text: "Kerja sama" },
        { label: "B", text: "Persaingan" },
        { label: "C", text: "Akomodasi" },
        { label: "D", text: "Komunikasi" },
      ], correct: "D", explanation: "Salam adalah bentuk komunikasi sederhana." },
      { id: 5, question: "Interaksi sosial yang bersifat kerja sama terjadi ketika…", options: [
        { label: "A", text: "Siswa berebut kursi di kelas" },
        { label: "B", text: "Dua kelompok saling mengejek" },
        { label: "C", text: "Siswa bersama-sama membersihkan kelas" },
        { label: "D", text: "Seseorang menghindari konflik" },
      ], correct: "C", explanation: "Membersihkan kelas bersama adalah kerja sama." },
      { id: 6, question: "Persaingan dalam interaksi sosial dapat terjadi ketika…", options: [
        { label: "A", text: "Siswa berusaha menjadi juara kelas" },
        { label: "B", text: "Siswa saling membantu" },
        { label: "C", text: "Guru memberikan nasihat" },
        { label: "D", text: "Siswa belajar kelompok" },
      ], correct: "A", explanation: "Persaingan muncul saat individu bersaing untuk menjadi yang terbaik." },
      { id: 7, question: "Contoh interaksi sosial dalam keluarga adalah…", options: [
        { label: "A", text: "Guru memberikan tugas di sekolah" },
        { label: "B", text: "Ayah berbincang dengan anaknya" },
        { label: "C", text: "Pedagang melayani pembeli" },
        { label: "D", text: "Teman bermain sepak bola" },
      ], correct: "B", explanation: "Ayah berbincang dengan anak adalah interaksi keluarga." },
      { id: 8, question: "Konflik sosial dapat diatasi dengan cara…", options: [
        { label: "A", text: "Menghindari komunikasi" },
        { label: "B", text: "Bertengkar lebih keras" },
        { label: "C", text: "Musyawarah dan saling memahami" },
        { label: "D", text: "Menyalahkan orang lain" },
      ], correct: "C", explanation: "Musyawarah membantu menyelesaikan konflik." },
      { id: 9, question: "Contoh interaksi sosial negatif adalah…", options: [
        { label: "A", text: "Berbagi makanan dengan teman" },
        { label: "B", text: "Berkelahi atau bertengkar" },
        { label: "C", text: "Gotong royong membangun pos ronda" },
        { label: "D", text: "Saling menolong saat bencana" },
      ], correct: "B", explanation: "Berkelahi adalah contoh interaksi negatif." },
      { id: 10, question: "Sikap yang dapat meningkatkan interaksi sosial positif adalah…", options: [
        { label: "A", text: "Egois dan tidak peduli" },
        { label: "B", text: "Saling menghargai dan bekerja sama" },
        { label: "C", text: "Menyendiri dan menghindari orang lain" },
        { label: "D", text: "Selalu ingin menang sendiri" },
      ], correct: "B", explanation: "Sikap saling menghargai mendorong interaksi positif." },
    ],
  },

  // PPKn
  601: {
    id: 601,
    title: "PPKn - Kelas 4 SD (Pancasila)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Nilai sila pertama Pancasila dapat diwujudkan dengan cara…", options: [
        { label: "A", text: "Bermain sepuasnya" },
        { label: "B", text: "Berdoa sebelum melakukan kegiatan" },
        { label: "C", text: "Menyontek saat ulangan" },
        { label: "D", text: "Tidak menghormati teman" },
      ], correct: "B", explanation: "Berdoa sebelum kegiatan mencerminkan nilai ketuhanan." },
      { id: 2, question: "Contoh sikap sesuai sila kedua Pancasila adalah…", options: [
        { label: "A", text: "Menghargai teman yang berbeda agama" },
        { label: "B", text: "Berkelahi dengan teman" },
        { label: "C", text: "Mengejek kekurangan orang lain" },
        { label: "D", text: "Memaksa teman ikut keinginannya" },
      ], correct: "A", explanation: "Menghargai perbedaan mencerminkan nilai kemanusiaan." },
      { id: 3, question: "Lambang sila ketiga Pancasila adalah…", options: [
        { label: "A", text: "Rantai emas" },
        { label: "B", text: "Pohon beringin" },
        { label: "C", text: "Kepala banteng" },
        { label: "D", text: "Padi dan kapas" },
      ], correct: "B", explanation: "Pohon beringin melambangkan persatuan." },
      { id: 4, question: "Persatuan Indonesia dapat diwujudkan dengan cara…", options: [
        { label: "A", text: "Menjauhi teman yang berbeda suku" },
        { label: "B", text: "Mengutamakan ego sendiri" },
        { label: "C", text: "Bekerja sama dalam kegiatan sekolah" },
        { label: "D", text: "Membeda-bedakan teman" },
      ], correct: "C", explanation: "Kerja sama adalah wujud persatuan." },
      { id: 5, question: "Sila keempat mengajarkan kita untuk…", options: [
        { label: "A", text: "Bermusyawarah dalam mengambil keputusan" },
        { label: "B", text: "Membiarkan teman kesulitan" },
        { label: "C", text: "Tidak peduli pendapat orang lain" },
        { label: "D", text: "Menggunakan kekerasan" },
      ], correct: "A", explanation: "Sila keempat menekankan musyawarah." },
      { id: 6, question: "Contoh penerapan sila kelima Pancasila adalah…", options: [
        { label: "A", text: "Membantu teman yang sedang kesulitan" },
        { label: "B", text: "Tidak mau berbagi makanan" },
        { label: "C", text: "Mengambil hak orang lain" },
        { label: "D", text: "Membeda-bedakan teman" },
      ], correct: "A", explanation: "Membantu sesama mencerminkan keadilan sosial." },
      { id: 7, question: "Menghormati orang yang lebih tua termasuk nilai sila…", options: [
        { label: "A", text: "Pertama" },
        { label: "B", text: "Kedua" },
        { label: "C", text: "Ketiga" },
        { label: "D", text: "Keempat" },
      ], correct: "B", explanation: "Menghormati orang tua mencerminkan nilai kemanusiaan (sila ke-2)." },
      { id: 8, question: "Saat rapat kelas, semua siswa menyampaikan pendapat. Sikap tersebut sesuai dengan sila…", options: [
        { label: "A", text: "Sila pertama" },
        { label: "B", text: "Sila kedua" },
        { label: "C", text: "Sila keempat" },
        { label: "D", text: "Sila kelima" },
      ], correct: "C", explanation: "Musyawarah termasuk sila keempat." },
      { id: 9, question: "Berbagi makanan kepada teman menunjukkan nilai…", options: [
        { label: "A", text: "Ketuhanan" },
        { label: "B", text: "Kemanusiaan" },
        { label: "C", text: "Persatuan" },
        { label: "D", text: "Keadilan sosial" },
      ], correct: "D", explanation: "Berbagi menunjukkan aspek keadilan sosial/ peduli sosial." },
      { id: 10, question: "Menjaga kebersihan lingkungan sekolah adalah bentuk kerja sama yang sesuai sila…", options: [
        { label: "A", text: "Kedua" },
        { label: "B", text: "Ketiga" },
        { label: "C", text: "Keempat" },
        { label: "D", text: "Kelima" },
      ], correct: "B", explanation: "Menjaga kebersihan mencerminkan persatuan (sila ke-3)." },
    ],
  },

  // Ekonomi (example)
  701: {
    id: 701,
    title: "Ekonomi - Kelas 10 SMA (Kebutuhan & Prioritas)",
    totalSoal: 10,
    questions: [
      { id: 1, question: "Kebutuhan adalah…", options: [
        { label: "A", text: "Segala sesuatu yang diinginkan manusia" },
        { label: "B", text: "Segala sesuatu yang harus dipenuhi agar manusia dapat bertahan hidup" },
        { label: "C", text: "Semua barang mewah yang membuat hidup nyaman" },
        { label: "D", text: "Keinginan yang tidak terbatas" },
      ], correct: "B", explanation: "Kebutuhan diperlukan untuk bertahan hidup seperti makanan, tempat tinggal." },
      { id: 2, question: "Di bawah ini yang termasuk kebutuhan primer adalah…", options: [
        { label: "A", text: "Pakaian, rumah, dan makanan" },
        { label: "B", text: "Televisi, handphone, dan sepeda motor" },
        { label: "C", text: "Liburan ke luar negeri" },
        { label: "D", text: "Perhiasan dan kosmetik" },
      ], correct: "A", explanation: "Kebutuhan primer: sandang, pangan, papan." },
      { id: 3, question: "Keinginan (wants) memiliki ciri-ciri…", options: [
        { label: "A", text: "Bersifat terbatas" },
        { label: "B", text: "Bersifat wajib dipenuhi untuk hidup" },
        { label: "C", text: "Tidak terbatas dan berubah-ubah" },
        { label: "D", text: "Tidak dapat ditunda" },
      ], correct: "C", explanation: "Keinginan bersifat tak terbatas dan berubah-ubah." },
      { id: 4, question: "Contoh kebutuhan sekunder adalah…", options: [
        { label: "A", text: "Makan" },
        { label: "B", text: "Rumah" },
        { label: "C", text: "Pendidikan" },
        { label: "D", text: "Televisi" },
      ], correct: "D", explanation: "Televisi termasuk kebutuhan sekunder." },
      { id: 5, question: "Skala prioritas dibuat dengan tujuan…", options: [
        { label: "A", text: "Menghabiskan uang secara cepat" },
        { label: "B", text: "Membeli semua yang diinginkan" },
        { label: "C", text: "Mengatur pemenuhan kebutuhan sesuai tingkat kepentingannya" },
        { label: "D", text: "Menambah jumlah keinginan" },
      ], correct: "C", explanation: "Skala prioritas membantu menentukan kebutuhan mana yang utama." },
      { id: 6, question: "Yang termasuk kebutuhan tersier adalah…", options: [
        { label: "A", text: "Makanan bergizi" },
        { label: "B", text: "Kendaraan mewah" },
        { label: "C", text: "Tempat tinggal" },
        { label: "D", text: "Air minum" },
      ], correct: "B", explanation: "Kebutuhan tersier bersifat mewah atau prestise." },
      { id: 7, question: "Jika seseorang memiliki uang terbatas, hal yang harus dilakukan adalah…", options: [
        { label: "A", text: "Membeli barang yang sedang tren" },
        { label: "B", text: "Memenuhi keinginan terlebih dahulu" },
        { label: "C", text: "Menyusun skala prioritas kebutuhan" },
        { label: "D", text: "Berhutang untuk memenuhi semua kebutuhan" },
      ], correct: "C", explanation: "Menyusun skala prioritas adalah langkah bijak." },
      { id: 8, question: "Kebutuhan manusia bersifat tidak terbatas karena…", options: [
        { label: "A", text: "Sumber daya alam yang melimpah" },
        { label: "B", text: "Keinginan manusia terus bertambah" },
        { label: "C", text: "Manusia tidak mengenal teknologi" },
        { label: "D", text: "Harga kebutuhan selalu murah" },
      ], correct: "B", explanation: "Keinginan manusia cenderung berkembang dan tidak terbatas." },
      { id: 9, question: "Barang berikut yang termasuk kebutuhan sekunder bagi siswa SMA adalah…", options: [
        { label: "A", text: "Seragam sekolah" },
        { label: "B", text: "Buku pelajaran" },
        { label: "C", text: "Smartphone untuk komunikasi" },
        { label: "D", text: "Makanan pokok" },
      ], correct: "C", explanation: "Smartphone bagi siswa sering dianggap kebutuhan sekunder." },
      { id: 10, question: "Kegiatan produksi adalah…", options: [
        { label: "A", text: "Kegiatan menyalurkan barang dari produsen ke konsumen" },
        { label: "B", text: "Kegiatan menggunakan barang untuk memenuhi kebutuhan" },
        { label: "C", text: "Kegiatan menghasilkan barang atau jasa" },
        { label: "D", text: "Kegiatan menjual barang di pasar" },
      ], correct: "C", explanation: "Produksi menghasilkan barang/jasa untuk memenuhi kebutuhan." },
    ],
  },
};

export default function DetailLatSoal() {
  const { id } = useParams();
  // choose dataset based on route id param (string) — fall back to 101 if not found
  const idNum = Number(id || 0);
  const soalData = allSoal[idNum] || allSoal[101];
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;

      if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSelectAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < soalData.questions.length - 1) {
      setCurrentQuestion((s) => s + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((s) => s - 1);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const question = soalData.questions[currentQuestion] || null;
  const selectedAnswer = question ? answers[question.id] : null;

  const correctCount = Object.keys(answers).filter((qId) => {
    const q = soalData.questions.find((qq) => qq.id === parseInt(qId, 10));
    return q && answers[qId] === q.correct;
  }).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar isNavbarVisible={isNavbarVisible} />
        
        <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-12">Pembahasan Latihan Soal</h1>

          <div className="space-y-6">
            {soalData.questions.map((q) => {
              const userAnswer = answers[q.id];
              const isUserCorrect = userAnswer === q.correct;

              return (
                <div key={q.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-yellow-400 text-slate-900 font-bold px-3 py-1 rounded text-sm flex-shrink-0">
                      Soal {q.id}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{q.question}</p>
                    </div>
                  </div>

                  <div className="mb-4 pl-12">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-semibold">Jawaban Anda:</span> {userAnswer || "Tidak dijawab"}
                    </p>
                    {userAnswer && (
                      <p
                        className={`text-sm font-semibold ${
                          isUserCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isUserCorrect ? "✓ Benar" : "✗ Salah"}
                      </p>
                    )}
                  </div>

                  {!isUserCorrect && userAnswer && (
                    <div className="mb-4 pl-12">
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold">Jawaban yang Benar:</span> {q.correct}
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded pl-4">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Penjelasan:</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                  </div>

                  <div className="mt-4 pl-12 space-y-2">
                    {q.options.map((option) => (
                      <div
                        key={option.label}
                        className={`p-3 rounded text-sm ${
                          option.label === q.correct
                            ? "bg-green-100 border-l-4 border-green-600"
                            : option.label === userAnswer && !isUserCorrect
                            ? "bg-red-100 border-l-4 border-red-600"
                            : "bg-slate-100"
                        }`}
                      >
                        <span className="font-bold">{option.label}.</span> {option.text}
                        {option.label === q.correct && <span className="text-green-600 ml-2">✓</span>}
                        {option.label === userAnswer && !isUserCorrect && (
                          <span className="text-red-600 ml-2">✗</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ringkasan Hasil</h2>
            <div className="mb-6">
              <div className="text-5xl font-extrabold text-blue-900 mb-2">
                {correctCount}/{soalData.totalSoal}
              </div>
              <p className="text-xl text-slate-600">
                Nilai Anda:{" "}
                <span className="font-bold text-blue-900">
                  {Math.round((correctCount / soalData.totalSoal) * 100)}%
                </span>
              </p>
            </div>

            <div className="mb-8">
              {Math.round((correctCount / soalData.totalSoal) * 100) >= 80 && (
                <p className="text-lg text-green-600 font-semibold">
                  🎉 Luar biasa! Kamu sudah menguasai materi ini!
                </p>
              )}
              {Math.round((correctCount / soalData.totalSoal) * 100) >= 60 &&
                Math.round((correctCount / soalData.totalSoal) * 100) < 80 && (
                  <p className="text-lg text-blue-600 font-semibold">
                    👍 Bagus! Terus tingkatkan pemahaman kamu.
                  </p>
                )}
              {Math.round((correctCount / soalData.totalSoal) * 100) < 60 && (
                <p className="text-lg text-orange-600 font-semibold">
                  📚 Pelajari kembali materi yang belum dipahami.
                </p>
              )}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResult(false);
                }}
                className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Coba Lagi
              </button>
              <button
                type="button"
                onClick={() => navigate("/latihan-soal")}
                className="px-8 py-3 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Kembali
              </button>
            </div>
          </div>
        </main>

        <footer className="mt-16 bg-[#063E6A] text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 flex flex-col md:flex-row md:justify-between gap-8">
            <div className="max-w-sm">
              <div className="font-bold text-lg">EDUTEKTIF</div>
              <p className="mt-3 text-sm text-slate-300">
                Kami percaya setiap orang berhak mendapatkan pendidikan bermutu,
                dan kami berusaha mewujudkannya untuk siapa saja, di mana saja.
              </p>
            </div>

            <div className="flex gap-12 text-sm">
              <nav>
                <div className="font-semibold mb-3">Sosial Media</div>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      TikTok
                    </a>
                  </li>
                </ul>
              </nav>

              <nav>
                <div className="font-semibold mb-3">Company</div>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      Kontak Kami
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Testimoni
                    </a>
                  </li>
                </ul>
              </nav>

              <nav>
                <div className="font-semibold mb-3">Bantuan & Panduan</div>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      Kebijakan Privasi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Ketentuan Penggunaan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Bantuan
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-blue-800/40 py-4">
            <div className="max-w-7xl mx-auto px-6 md:px-20 text-center text-sm text-slate-300">
              ©2025 Edutektif. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-8">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-2 py-2 text-slate-800 hover:text-slate-900 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Kembali</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">{soalData.title}</h1>

        <div className="mb-8">
          <div className="flex gap-2 mb-2 flex-wrap">
            {soalData.questions.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestion(idx)}
                className={`px-3 py-2 rounded text-xs font-semibold transition ${
                  currentQuestion === idx
                    ? "bg-yellow-400 text-slate-900"
                    : answers[q.id]
                    ? "bg-green-500 text-white"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                Soal {q.id}
              </button>
            ))}
          </div>
          <div className="w-full bg-slate-300 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / soalData.totalSoal) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {question ? (
            <>
              <div className="bg-yellow-400 text-slate-900 rounded-lg p-6 mb-8 text-center font-semibold text-lg">
                {question.question}
              </div>

              <div className="space-y-4 mb-8">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelectAnswer(question.id, option.label)}
                    className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                      selectedAnswer === option.label
                        ? "border-blue-900 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-400"
                    }`}
                  >
                    <span className="font-bold">{option.label}.</span> {option.text}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    currentQuestion === 0
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-slate-600 text-white hover:bg-slate-700"
                  }`}
                >
                  Soal Sebelumnya
                </button>

                {currentQuestion === soalData.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  >
                    Selesai
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-8 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  >
                    Soal Selanjutnya
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center p-8">Soal tidak tersedia.</div>
          )}
        </div>
      </main>

      <footer className="mt-16 bg-[#063E6A] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 flex flex-col md:flex-row md:justify-between gap-8">
          <div className="max-w-sm">
            <div className="font-bold text-lg">EDUTEKTIF</div>
            <p className="mt-3 text-sm text-slate-300">
              Kami percaya setiap orang berhak mendapatkan pendidikan bermutu,
              dan kami berusaha mewujudkannya untuk siapa saja, di mana saja.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <nav>
              <div className="font-semibold mb-3">Sosial Media</div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    TikTok
                  </a>
                </li>
              </ul>
            </nav>

            <nav>
              <div className="font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Kontak Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Testimoni
                  </a>
                </li>
              </ul>
            </nav>

            <nav>
              <div className="font-semibold mb-3">Bantuan & Panduan</div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ketentuan Penggunaan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Bantuan
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-blue-800/40 py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center text-sm text-slate-300">
            ©2025 Edutektif. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 
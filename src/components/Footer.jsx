import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      {/* ===== FOOTER ===== */}
      <footer className="bg-edubiru text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-14 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-extrabold mb-4">EDUTEKTIF</h3>
            <p className="text-sm text-edubiru-100">
              Kami percaya setiap orang berhak mendapatkan pendidikan bermutu.
            </p>
          </div>

          {/* SOSIAL MEDIA */}
          <nav className="text-sm">
            <h4 className="font-semibold mb-3">Sosial Media</h4>
            <ul className="space-y-2 text-edubiru-100">
              <li>
                <a
                  href="https://instagram.com/edutektif"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@edutektif"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@edutektif"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </nav>

          {/* COMPANY */}
          <nav className="text-sm">
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-edubiru-100">
              <li>
                <button onClick={() => navigate("/kontak")}>Kontak Kami</button>
              </li>
              <li>
                <button onClick={() => navigate("/tentang")}>
                  Tentang Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/testimoni")}>
                  Testimoni
                </button>
              </li>
            </ul>
          </nav>

          {/* BANTUAN */}
          <nav className="text-sm">
            <h4 className="font-semibold mb-3">Bantuan & Panduan</h4>
            <ul className="space-y-2 text-edubiru-100">
              <li>
                <button onClick={() => setActiveModal("privacy")}>
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal("terms")}>
                  Ketentuan Penggunaan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal("help")}>Bantuan</button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-edubiru-100/50 py-4 text-center text-sm text-edubiru-100">
          ©2025 Edutektif. All rights reserved.
        </div>
      </footer>

      {/* ===== MODAL ===== */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {activeModal === "privacy" && "Kebijakan Privasi"}
              {activeModal === "terms" && "Ketentuan Penggunaan"}
              {activeModal === "help" && "Bantuan"}
            </h2>

            {/* Kebijakan Privasi */}
            {activeModal === "privacy" && (
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  Kebijakan Privasi ini menjelaskan bagaimana Edutektif
                  mengumpulkan, menggunakan, dan melindungi data pribadi Anda
                  saat menggunakan website, aplikasi, maupun layanan yang kami
                  sediakan.
                </p>

                <h3 className="font-semibold">Pengumpulan Data Pribadi</h3>
                <p>
                  Kami dapat mengumpulkan data pribadi yang Anda berikan secara
                  langsung, seperti:
                </p>
                <ul className="list-disc pl-6">
                  <li>Nama, email, nomor telepon, dan informasi akun;</li>
                  <li>
                    Data aktivitas belajar seperti progres, hasil latihan, dan
                    interaksi dalam Platform.
                  </li>
                  <li>
                    Selain itu, kami juga mengumpulkan data otomatis seperti
                    alamat IP, jenis perangkat, informasi browser, dan perilaku
                    penggunaan untuk keperluan peningkatan layanan.
                  </li>
                </ul>

                <h3 className="font-semibold">Penggunaan Data</h3>
                <p>Data pribadi digunakan untuk:</p>
                <ul className="list-disc pl-6">
                  <li>
                    Mengelola akun dan menyediakan akses ke fitur dan konten;
                  </li>
                  <li>
                    Memperbaiki, mengembangkan, dan mempersonalisasi pengalaman
                    belajar;
                  </li>
                  <li>
                    Mengirimkan pemberitahuan penting, pembaruan layanan, dan
                    informasi terkait Edutektif;
                  </li>
                  <li>Memenuhi kewajiban hukum yang berlaku.</li>
                </ul>

                <h3 className="font-semibold">
                  Pembagian dan Pengungkapan Data
                </h3>
                <p>
                  Kami tidak menjual atau memperdagangkan data pribadi Anda.
                  Data hanya dapat dibagikan kepada:
                </p>
                <ul className="list-disc pl-6">
                  <li>
                    Mitra resmi yang membantu operasional Platform dan terikat
                    kewajiban kerahasiaan;
                  </li>
                  <li>Pihak berwenang jika diwajibkan oleh hukum;</li>
                  <li>Pihak lain berdasarkan persetujuan Anda.</li>
                </ul>

                <h3 className="font-semibold">Keamanan Data</h3>
                <p>
                  Kami menerapkan langkah teknis dan prosedural untuk menjaga
                  keamanan data pribadi. Namun, Anda juga bertanggung jawab
                  menjaga kerahasiaan akun, termasuk kata sandi, demi
                  menghindari penyalahgunaan.
                </p>

                <h3 className="font-semibold">Hak Pengguna</h3>
                <p>Anda memiliki hak untuk:</p>
                <ul className="list-disc pl-6">
                  <li>Mengakses atau memperbarui data pribadi Anda;</li>
                  <li>Menarik persetujuan penggunaan data;</li>
                  <li>
                    Meminta penghapusan data dari sistem kami. Permintaan dapat
                    diajukan melalui kontak resmi yang tersedia di Platform.
                  </li>
                </ul>

                <h3 className="font-semibold">Perubahan Kebijakan</h3>
                <p>
                  Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu.
                  Perubahan akan kami informasikan melalui aplikasi, email, atau
                  media lain. Dengan tetap menggunakan Platform, Anda dianggap
                  menyetujui Kebijakan yang telah diperbarui.
                </p>
              </div>
            )}

            {/* Ketentuan Penggunaan */}
            {activeModal === "terms" && (
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  Terima kasih telah menggunakan Edutektif, platform
                  pembelajaran yang menyediakan latihan soal, materi video, dan
                  fitur edukasi lainnya.
                </p>
                <p>
                  Ketentuan Penggunaan ini berlaku bagi seluruh pengguna dan
                  pengunjung situs Edutektif, aplikasi Edutektif, serta seluruh
                  fitur, konten, dan layanan yang kami sediakan (“Platform”).
                  Dengan mengakses atau menggunakan Platform, Anda menyatakan
                  telah membaca, memahami, dan menyetujui Ketentuan Penggunaan
                  ini serta Kebijakan Privasi kami.
                </p>
                <p>
                  Jika Anda tidak menyetujui ketentuan ini, mohon tidak
                  menggunakan Platform.
                </p>

                <h3 className="font-semibold">Penggunaan Akun</h3>
                <ul className="list-disc pl-6">
                  <li>
                    Untuk membuat akun, Anda menyatakan bahwa informasi yang
                    diberikan adalah benar, lengkap, dan terbaru.
                  </li>
                  <li>
                    Anda bertanggung jawab penuh atas keamanan akun Anda,
                    termasuk kerahasiaan kata sandi.
                  </li>
                  <li>
                    Segala aktivitas yang terjadi melalui akun Anda menjadi
                    tanggung jawab Anda.
                  </li>
                </ul>

                <h3 className="font-semibold">Penggunaan Layanan</h3>
                <ul className="list-disc pl-6">
                  <li>
                    Beberapa fitur mungkin memerlukan pendaftaran atau akses
                    premium.
                  </li>
                  <li>
                    Anda setuju untuk menggunakan Platform hanya untuk tujuan
                    belajar dan tidak untuk tindakan yang melanggar hukum,
                    merugikan, atau menyalahgunakan fitur.
                  </li>
                  <li>
                    Dilarang menyalin, mendistribusikan, atau mempublikasikan
                    konten Edutektif tanpa izin.
                  </li>
                </ul>

                <h3 className="font-semibold">Hak Kekayaan Intelektual</h3>
                <p>
                  Seluruh konten dalam Platform, termasuk video, soal, gambar,
                  desain, dan elemen lainnya merupakan milik Edutektif dan
                  dilindungi oleh hukum. Penggunaan konten hanya diperbolehkan
                  untuk kebutuhan pribadi dan non-komersial.
                </p>

                <h3 className="font-semibold">Pembayaran dan Langganan</h3>
                <ul className="list-disc pl-6">
                  <li>
                    Akses penuh ke layanan tertentu memerlukan pembayaran
                    langganan.
                  </li>
                  <li>
                    Biaya langganan bersifat tetap dan dibayarkan di muka sesuai
                    paket yang dipilih.
                  </li>
                  <li>
                    Harga dapat berubah sewaktu-waktu dan akan diberitahukan
                    kepada Pengguna.
                  </li>
                </ul>

                <h3 className="font-semibold">Kebijakan Pengembalian Dana</h3>
                <p>
                  Pengembalian dana hanya dapat dilakukan jika terdapat
                  kesalahan teknis atau pembayaran melebihi jumlah yang
                  seharusnya. Proses pengembalian dilakukan sesuai prosedur
                  resmi Edutektif.
                </p>

                <h3 className="font-semibold">Batasan Tanggung Jawab</h3>
                <p>
                  Platform disediakan sebagaimana adanya. Edutektif tidak
                  menjamin bahwa layanan selalu bebas gangguan atau kesalahan.
                  Segala risiko penggunaan Platform menjadi tanggung jawab
                  Pengguna.
                </p>

                <h3 className="font-semibold">Penangguhan Akun</h3>
                <p>
                  Edutektif berhak menangguhkan atau menghentikan akses akun
                  Pengguna yang melanggar Ketentuan Penggunaan, terindikasi
                  melakukan penyalahgunaan, atau melanggar hukum.
                </p>

                <h3 className="font-semibold">Perubahan Ketentuan</h3>
                <p>
                  Edutektif dapat mengubah Ketentuan Penggunaan sewaktu-waktu.
                  Perubahan akan diberitahukan melalui email, aplikasi, atau
                  halaman Platform. Penggunaan berlanjut berarti Anda menyetujui
                  perubahan tersebut.
                </p>
              </div>
            )}

            {/* Bantuan */}
            {activeModal === "help" && (
              <p className="text-sm text-slate-700">
                Silakan hubungi tim Edutektif melalui media sosial resmi untuk
                bantuan lebih lanjut.
              </p>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="text-edubiru font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Pastikan install lucide-react jika belum

export default function Footer() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* ===== FOOTER ===== */}
      <footer className="bg-edubiru text-white font-poppins">
        {/* PERUBAHAN UI/UX:
            - Menggunakan 'text-left' agar rata kiri di semua ukuran layar (Mobile & Desktop).
            - Menggunakan 'items-start' pada flex container agar logo tidak di tengah.
        */}
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-16 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 text-left">
          {/* 1. BRAND / LOGO */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h3 className="text-3xl font-extrabold mb-4 tracking-wide">
              EDUTEKTIF
            </h3>
            <p className="text-sm text-edubiru-100 leading-relaxed max-w-xs">
              Kami percaya setiap orang berhak mendapatkan pendidikan bermutu
              dengan akses yang mudah dan terjangkau.
            </p>
          </div>

          {/* 2. SOSIAL MEDIA */}
          <nav className="text-sm">
            <h4 className="font-bold text-lg mb-4 text-white">Sosial Media</h4>
            <ul className="space-y-3 text-edubiru-100">
              <li>
                <a
                  href="https://instagram.com/edutektif"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@edutektif"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@edutektif"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </nav>

          {/* 3. PERUSAHAAN */}
          <nav className="text-sm">
            <h4 className="font-bold text-lg mb-4 text-white">Perusahaan</h4>
            <ul className="space-y-3 text-edubiru-100">
              <li>
                <button
                  onClick={() => navigate("/kontak")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Kontak Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/kontak")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/testimoni")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Testimoni
                </button>
              </li>
            </ul>
          </nav>

          {/* 4. BANTUAN */}
          <nav className="text-sm">
            <h4 className="font-bold text-lg mb-4 text-white">Bantuan</h4>
            <ul className="space-y-3 text-edubiru-100">
              <li>
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Ketentuan Pengguna
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("help")}
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                >
                  Bantuan
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-edubiru-100/30 py-6 text-center md:text-left text-xs md:text-sm text-edubiru-100 px-6">
          © {new Date().getFullYear()} Edutektif. All rights reserved.
        </div>
      </footer>

      {/* ===== MODAL POPUP ===== */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
          onClick={closeModal}
        >
          {/* Container Modal */}
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                {activeModal === "privacy" && "Kebijakan Privasi"}
                {activeModal === "terms" && "Ketentuan Penggunaan"}
                {activeModal === "help" && "Bantuan"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Isi Konten (Scrollable) */}
            <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar text-sm md:text-base text-slate-700 leading-relaxed space-y-4 text-left">
              {/* === KEBIJAKAN PRIVASI (FULL TEXT) === */}
              {activeModal === "privacy" && (
                <div className="space-y-4">
                  <p>
                    Kebijakan Privasi ini menjelaskan bagaimana Edutektif
                    mengumpulkan, menggunakan, dan melindungi data pribadi Anda
                    saat menggunakan website, aplikasi, maupun layanan yang kami
                    sediakan.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Pengumpulan Data Pribadi
                  </h3>
                  <p>
                    Kami dapat mengumpulkan data pribadi yang Anda berikan
                    secara langsung, seperti:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Nama, email, nomor telepon, dan informasi akun;</li>
                    <li>
                      Data aktivitas belajar seperti progres, hasil latihan, dan
                      interaksi dalam Platform.
                    </li>
                    <li>
                      Selain itu, kami juga mengumpulkan data otomatis seperti
                      alamat IP, jenis perangkat, informasi browser, dan
                      perilaku penggunaan untuk keperluan peningkatan layanan.
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Penggunaan Data
                  </h3>
                  <p>Data pribadi digunakan untuk:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Mengelola akun dan menyediakan akses ke fitur dan konten;
                    </li>
                    <li>
                      Memperbaiki, mengembangkan, dan mempersonalisasi
                      pengalaman belajar;
                    </li>
                    <li>
                      Mengirimkan pemberitahuan penting, pembaruan layanan, dan
                      informasi terkait Edutektif;
                    </li>
                    <li>Memenuhi kewajiban hukum yang berlaku.</li>
                  </ul>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Pembagian dan Pengungkapan Data
                  </h3>
                  <p>
                    Kami tidak menjual atau memperdagangkan data pribadi Anda.
                    Data hanya dapat dibagikan kepada:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Mitra resmi yang membantu operasional Platform dan terikat
                      kewajiban kerahasiaan;
                    </li>
                    <li>Pihak berwenang jika diwajibkan oleh hukum;</li>
                    <li>Pihak lain berdasarkan persetujuan Anda.</li>
                  </ul>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Keamanan Data
                  </h3>
                  <p>
                    Kami menerapkan langkah teknis dan prosedural untuk menjaga
                    keamanan data pribadi. Namun, Anda juga bertanggung jawab
                    menjaga kerahasiaan akun, termasuk kata sandi, demi
                    menghindari penyalahgunaan.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">Hak Pengguna</h3>
                  <p>Anda memiliki hak untuk:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mengakses atau memperbarui data pribadi Anda;</li>
                    <li>Menarik persetujuan penggunaan data;</li>
                    <li>
                      Meminta penghapusan data dari sistem kami. Permintaan
                      dapat diajukan melalui kontak resmi yang tersedia di
                      Platform.
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Perubahan Kebijakan
                  </h3>
                  <p>
                    Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu.
                    Perubahan akan kami informasikan melalui aplikasi, email,
                    atau media lain. Dengan tetap menggunakan Platform, Anda
                    dianggap menyetujui Kebijakan yang telah diperbarui.
                  </p>
                </div>
              )}

              {/* === KETENTUAN PENGGUNA (FULL TEXT) === */}
              {activeModal === "terms" && (
                <div className="space-y-4">
                  <p>
                    Terima kasih telah menggunakan Edutektif, platform
                    pembelajaran yang menyediakan latihan soal, materi video,
                    dan fitur edukasi lainnya.
                  </p>
                  <p>
                    Ketentuan Penggunaan ini berlaku bagi seluruh pengguna dan
                    pengunjung situs Edutektif, aplikasi Edutektif, serta
                    seluruh fitur, konten, dan layanan yang kami sediakan
                    (“Platform”). Dengan mengakses atau menggunakan Platform,
                    Anda menyatakan telah membaca, memahami, dan menyetujui
                    Ketentuan Penggunaan ini serta Kebijakan Privasi kami.
                  </p>
                  <p>
                    Jika Anda tidak menyetujui ketentuan ini, mohon tidak
                    menggunakan Platform.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Penggunaan Akun
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
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

                  <h3 className="font-bold text-gray-900 mt-4">
                    Penggunaan Layanan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
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

                  <h3 className="font-bold text-gray-900 mt-4">
                    Hak Kekayaan Intelektual
                  </h3>
                  <p>
                    Seluruh konten dalam Platform, termasuk video, soal, gambar,
                    desain, dan elemen lainnya merupakan milik Edutektif dan
                    dilindungi oleh hukum. Penggunaan konten hanya diperbolehkan
                    untuk kebutuhan pribadi dan non-komersial.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Pembayaran dan Langganan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Akses penuh ke layanan tertentu memerlukan pembayaran
                      langganan.
                    </li>
                    <li>
                      Biaya langganan bersifat tetap dan dibayarkan di muka
                      sesuai paket yang dipilih.
                    </li>
                    <li>
                      Harga dapat berubah sewaktu-waktu dan akan diberitahukan
                      kepada Pengguna.
                    </li>
                  </ul>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Kebijakan Pengembalian Dana
                  </h3>
                  <p>
                    Pengembalian dana hanya dapat dilakukan jika terdapat
                    kesalahan teknis atau pembayaran melebihi jumlah yang
                    seharusnya. Proses pengembalian dilakukan sesuai prosedur
                    resmi Edutektif.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Batasan Tanggung Jawab
                  </h3>
                  <p>
                    Platform disediakan sebagaimana adanya. Edutektif tidak
                    menjamin bahwa layanan selalu bebas gangguan atau kesalahan.
                    Segala risiko penggunaan Platform menjadi tanggung jawab
                    Pengguna.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Penangguhan Akun
                  </h3>
                  <p>
                    Edutektif berhak menangguhkan atau menghentikan akses akun
                    Pengguna yang melanggar Ketentuan Penggunaan, terindikasi
                    melakukan penyalahgunaan, atau melanggar hukum.
                  </p>

                  <h3 className="font-bold text-gray-900 mt-4">
                    Perubahan Ketentuan
                  </h3>
                  <p>
                    Edutektif dapat mengubah Ketentuan Penggunaan sewaktu-waktu.
                    Perubahan akan diberitahukan melalui email, aplikasi, atau
                    halaman Platform. Penggunaan berlanjut berarti Anda
                    menyetujui perubahan tersebut.
                  </p>
                </div>
              )}

              {/* === BANTUAN === */}
              {activeModal === "help" && (
                <div className="text-center py-8">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    👋
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Butuh Bantuan?
                  </h3>
                  <p className="mb-6 max-w-sm mx-auto text-gray-600">
                    Silakan hubungi tim Edutektif melalui media sosial resmi
                    untuk bantuan lebih lanjut.
                  </p>

                  <div className="grid gap-3 max-w-xs mx-auto">
                    <a
                      href="https://wa.me/628123456789"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition shadow-lg hover:shadow-green-500/30"
                    >
                      Hubungi WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end flex-shrink-0">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-edubiru text-white rounded-lg font-semibold hover:bg-edubiru-900 transition shadow-md w-full md:w-auto"
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

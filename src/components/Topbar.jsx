import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Topbar({ title }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlTopbar = () => {
    if (window.scrollY > lastScrollY) {
      // scroll ke bawah → hide
      setShow(false);
    } else {
      // scroll ke atas → show
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlTopbar);
    return () => window.removeEventListener("scroll", controlTopbar);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-edubiru shadow-lg transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center gap-4">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          aria-label="Kembali"
        >
          <FiArrowLeft className="text-2xl text-white" />
        </button>

        {/* TITLE */}
        <h1 className="text-lg font-bold text-white tracking-wide">{title}</h1>
      </div>
    </header>
  );
}

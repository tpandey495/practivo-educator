import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "lucide-react";

import glossaryImg from "../../assets/tiiron-course-glossary.png";
import progressImg from "../../assets/tiiron-course-progress.png";
import editImg from "../../assets/tiiron-courses-edit.png";
import coursesImg from "../../assets/tiiron-courses.png";

const ProductOverview = () => {
  const galleryItems = [
    { src: glossaryImg, alt: "Glossary View" },
    { src: progressImg, alt: "Course Progress" },
    { src: editImg, alt: "Edit Courses" },
    { src: coursesImg, alt: "Courses Overview" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const openImage = (index: any) => {
    setSelectedIndex(index);
    setZoomed(false);
  };
  const closeModal = () => {
    setSelectedIndex(null);
    setZoomed(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
    setZoomed(false);
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
    setZoomed(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const toggleZoom = () => setZoomed((z) => !z);

  return (
    <section className="w-full py-20 bg-slate-950 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white text-center relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r pr-3 from-red-400 via-pink-500 to-yellow-400 text-transparent    bg-clip-text">
            Product
          </span>
          Overview
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
          Tiiron is designed to simplify workflows and unlock the full potential
          of your business. Whether you’re scaling fast or just starting, Tiiron
          adapts to your needs with flexibility and precision.
        </p>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              onClick={() => openImage(idx)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-base font-semibold">{item.alt}</h3>
                  <p className="text-xs text-gray-300">Click to enlarge</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div
            className="relative w-full max-w-5xl flex flex-col items-center"
            onClick={closeModal}
          >
            <img
              src={galleryItems[selectedIndex].src}
              alt={galleryItems[selectedIndex].alt}
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className={`rounded-lg shadow-xl max-h-[80vh] object-contain transition-transform duration-300 ${zoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                }`}
            />

            <p className="mt-4 text-white text-center text-sm">
              {galleryItems[selectedIndex].alt}
            </p>

            {/* Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition shadow-lg"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition shadow-lg"
              aria-label="Next image"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>


            <button
              onClick={closeModal}
              className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="absolute bottom-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
              aria-label="Toggle zoom"
            >
              {zoomed ? (
                <ZoomOut className="w-5 h-5 text-white" />
              ) : (
                <ZoomIn className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductOverview;

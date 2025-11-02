import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Learning Manager",
    feedback:
      "Tiiron transformed the way we deliver training. It’s intuitive, fun, and incredibly effective!",
    rating: 5,
  },
  {
    name: "David Smith",
    role: "HR Head",
    feedback:
      "Our team loves using Tiiron. Course creation went from weeks to minutes.",
    rating: 5,
  },
  {
    name: "Emily Brown",
    role: "Educator",
    feedback:
      "The automation and AI features are a game-changer for modern learning.",
    rating: 4,
  },
];

const initialIndex = 0;

const Testimonials = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(initialIndex);
  const [isScrollable, setIsScrollable] = useState(false);

  // Detect whether horizontal scrolling is available (small screens)
  useEffect(() => {
    const checkScrollable = () => {
      const el = containerRef.current;
      if (!el) return;
      setIsScrollable(el.scrollWidth > el.clientWidth + 4);
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  // Ensure active stays in range
  useEffect(() => {
    if (active < 0) setActive(0);
    if (active > testimonials.length - 1) setActive(testimonials.length - 1);
  }, [active]);

  // Scroll to card index for the carousel (mobile)
  const scrollToIndex = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.children[index];
    if (!card) return;
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
    setActive(index);
  };

  const handlePrev = () => {
    const next = Math.max(0, active - 1);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(testimonials.length - 1, active + 1);
    scrollToIndex(next);
  };

  // Update active based on scroll position (for manual swipe)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children);
        if (!cards.length) return;
        // find nearest card center
        const center = el.scrollLeft + el.clientWidth / 2;
        let nearestIdx = 0;
        let nearestDist = Infinity;
        cards.forEach((c, i) => {
          const cCenter = (c as HTMLElement).offsetLeft + (c as HTMLElement).clientWidth / 2;
          const d = Math.abs(center - cCenter);
          if (d < nearestDist) {
            nearestDist = d;
            nearestIdx = i;
          }
        });
        setActive(nearestIdx);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="py-20 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
              Users Say
            </span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            See how Tiiron is helping educators and teams scale learning like never before.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              aria-labelledby={`testi-${i}-name`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        id={`testi-${i}-name`}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {t.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                    </div>
                    <div className="flex items-center gap-1" aria-hidden>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s < t.rating ? "text-yellow-500" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-4 text-gray-700 italic relative pl-5">
                    <Quote className="absolute -left-1 top-0 w-5 h-5 text-stone-400" />
                    {t.feedback}
                  </blockquote>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile carousel (snap) */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-gray-900">
              Testimonials
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={active === 0}
                aria-label="Previous testimonial"
                className="p-2 rounded-md bg-white border border-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={active === testimonials.length - 1}
                aria-label="Next testimonial"
                className="p-2 rounded-md bg-white border border-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x py-2 -mx-4 px-4"
            role="list"
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                role="listitem"
                className={`snap-center min-w-[80%] sm:min-w-[70%] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex-shrink-0 ${
                  active === i ? "ring-2 ring-red-100" : ""
                }`}
                aria-labelledby={`testi-mobile-${i}-name`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      id={`testi-mobile-${i}-name`}
                      className="text-sm font-semibold text-gray-900"
                    >
                      {t.name}
                    </h3>
                    <p className="text-xs text-gray-500">{t.role}</p>
                    <blockquote className="mt-3 text-gray-700 italic text-sm">
                      “{t.feedback}”
                    </blockquote>

                    <div className="mt-3 flex items-center gap-1" aria-hidden>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s < t.rating ? "text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full ${
                  i === active ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

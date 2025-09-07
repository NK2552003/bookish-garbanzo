import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageData {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const image = images[currentIndex];

  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 left-4 text-white text-2xl"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <X />
      </motion.button>

      {/* Left Arrow */}
      <motion.button
        onClick={onPrev}
        className="absolute left-4 text-white text-3xl"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft />
      </motion.button>

      {/* Image with AnimatePresence */}
      <div className="max-w-5xl max-h-[80vh] flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={image.src} // triggers animation on change
            src={image.src}
            alt={image.alt}
            className="max-h-[80vh] object-contain"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <motion.p
          className="mt-4 text-white text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {image.alt}
        </motion.p>
      </div>

      {/* Right Arrow */}
      <motion.button
        onClick={onNext}
        className="absolute right-4 text-white text-3xl"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight />
      </motion.button>
    </motion.div>
  );
}

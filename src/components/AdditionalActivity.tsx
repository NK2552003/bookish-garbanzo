import { motion } from "framer-motion";
import MasonryGallery from "./photogallery";

const GridLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 gap-6 sm:mx-4">
      {/* Non-animated Gaming Interface */}
      <motion.div 
        className="flex-grow rounded-md w-full mt-12 h-auto mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <MasonryGallery/>
      </motion.div>
    </div>
  );
};

export default GridLayout;
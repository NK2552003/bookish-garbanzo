import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, User, Layers, Award, Grid, Folder, Code2, Mail } from "lucide-react";

const sectionIds = [
  { id: "hero", icon: <Home className="w-3 h-3 md:w-5 md:h-5" /> },
  { id: "about", icon: <User className="w-3 h-3 md:w-5 md:h-5" /> },
  { id: "skills", icon: <Layers className="w-3 h-3 md:w-5 md:h-5" /> },
  { id: "qualifications", icon: <Award className="w-3 h-3 md:w-5 md:h-5"  /> },
  { id: "photography", icon: <Grid className="w-3 h-3 md:w-5 md:h-5" /> },
  { id: "projects", icon: <Folder className="w-3 h-3 md:w-5 md:h-5"  /> },
  { id: "codepens", icon: <Code2 className="w-3 h-3 md:w-5 md:h-5" /> },
  { id: "contact", icon: <Mail className="w-3 h-3 md:w-5 md:h-5"  /> },
];

export function FloatingNav() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false); // close after navigation
  };

  return (
    <div className="fixed right-2 md:right-6 top-40 md:top-74 z-500 flex flex-col items-center">
      {/* Main Menu Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1.5 md:p-2.5 rounded-lg md:rounded-xl backdrop-blur-xl text-white hover:bg-white/20 transition border border-white/20"
      >
        <Menu className="w-3 h-3 md:w-5 md:h-5" />
      </button>

      {/* Animated Nav Icons */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-2 flex flex-col gap-2"
          >
            {sectionIds.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-1.5 md:p-2.5 rounded-lg md:rounded-xl hover:bg-white/20 text-white transition border border-white/20 bg-[#031412]"
              >
                {section.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

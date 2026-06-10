import { motion } from 'motion/react';

export default function SectionDivider() {
  return (
    <div className="w-full h-0 relative z-50 pointer-events-none mix-blend-difference flex items-center justify-center">
      <div className="absolute w-full px-6 md:px-12 flex items-center justify-center gap-4">
        {/* Left Line */}
        <svg className="w-full h-[2px] overflow-visible" preserveAspectRatio="none">
          <motion.line 
            x1="0" 
            y1="1" 
            x2="100%" 
            y2="1" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        
        {/* Central Node */}
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="w-2 h-2 shrink-0 rounded-full border border-white/80 flex items-center justify-center"
        >
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
                className="w-[2px] h-[2px] bg-white rounded-full"
            />
        </motion.div>
        
        {/* Right Line (Drawing backwards via pathLength from another direction, 
            or using rotate for visual mirroring) */}
        <svg className="w-full h-[2px] overflow-visible" preserveAspectRatio="none">
          <motion.line 
            x1="100%" 
            y1="1" 
            x2="0" 
            y2="1" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
    </div>
  );
}

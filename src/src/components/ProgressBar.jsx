import { motion } from 'framer-motion'
export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
      <motion.div className="h-full bg-gradient-to-r from-blush via-gold to-lavender" initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
    </div>
  )
}

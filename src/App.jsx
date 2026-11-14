import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import Particles from './components/Particles'
import MusicPlayer from './components/MusicPlayer'
import ProgressBar from './components/ProgressBar'
import CardWelcome from './components/Cards/CardWelcome'
import CardWishes from './components/Cards/CardWishes'
import CardMemories from './components/Cards/CardMemories'
import CardLetter from './components/Cards/CardLetter'
import CardFun from './components/Cards/CardFun'
import CardFinal from './components/Cards/CardFinal'

const CARDS = [CardWelcome, CardWishes, CardMemories, CardLetter, CardFun, CardFinal]

export default function App() {
  const [step, setStep] = useState(0)
  const CurrentCard = CARDS[step]
  const nextStep = () => setStep(s => Math.min(s + 1, CARDS.length - 1))
  const prevStep = () => setStep(s => Math.max(s - 1, 0))
  const reset = () => setStep(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden font-body">
      <Particles />
      <MusicPlayer />
      <div className="w-full max-w-lg mx-auto relative z-10">
        {step < CARDS.length - 1 && <ProgressBar current={step} total={CARDS.length} />}
        <div className="glass-card min-h-[450px] flex flex-col justify-between">
          <div className="flex-grow flex items-center justify-center py-4">
            <AnimatePresence mode="wait">
              <CurrentCard key={step} onNext={nextStep} />
            </AnimatePresence>
          </div>
          {step < CARDS.length - 1 ? (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
              <button onClick={prevStep} disabled={step === 0} className={`flex items-center gap-1 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex gap-1.5">
                {CARDS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'bg-blush w-4' : 'bg-white/20 w-1.5'}`} />
                ))}
              </div>
              <button onClick={nextStep} className="flex items-center gap-1 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full text-gold hover:bg-white/10 transition-colors font-medium">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
             <div className="flex justify-center mt-6 pt-4 border-t border-white/10">
               <button onClick={reset} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                 <RotateCcw className="w-3 h-3" /> Replay Experience
               </button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

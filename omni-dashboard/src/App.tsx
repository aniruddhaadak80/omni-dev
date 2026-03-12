import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles, ArrowDown, Check, Layout, Code, Globe, Shield, Activity, HardDrive } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay opacity-[0.05] mix-blend-multiply" />
);

const BackgroundDrift = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-beige/40 blur-[120px] animate-drift" />
    <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-rose/30 blur-[120px] animate-drift [animation-delay:-10s]" />
  </div>
);

const FloatingEchoPanel = () => (
  <aside className="fixed bottom-8 right-8 w-72 h-auto p-6 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-50 flex flex-col gap-4 animate-fade-in [animation-delay:0.8s]">
    <div className="flex items-center justify-between">
      <span className="text-charcoal font-clash font-bold text-lg">Omni-Echo</span>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest opacity-50">Active</span>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex-1 h-1 bg-taupe/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-taupe" 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 2, delay: 1 }}
          />
        </div>
        <span className="text-[10px] font-bold">65%</span>
      </div>
      <p className="text-xs text-taupe leading-relaxed italic opacity-80">
        "Infinite complexity, governed by local simplicity."
      </p>
    </div>
  </aside>
);

interface ArchetypeCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const ArchetypeCard = ({ icon, label, description }: ArchetypeCardProps) => {
  return (
    <label className="group relative block cursor-pointer">
      <input type="checkbox" className="peer sr-only" />
      <div className="p-8 bg-white/60 backdrop-blur-sm border border-transparent rounded-2xl transition-all duration-300 group-hover:-rotate-1 group-hover:scale-[1.02] peer-checked:border-charcoal peer-checked:bg-white shadow-xl hover:shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-beige/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="w-6 h-6 rounded-full border border-taupe/30 flex items-center justify-center peer-checked:bg-charcoal transition-colors">
            <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" />
          </div>
        </div>
        <h3 className="text-2xl font-clash font-bold mb-2">{label}</h3>
        <p className="text-sm text-taupe leading-relaxed">{description}</p>
      </div>
    </label>
  );
};

const OrbitalDial = () => {
    const dialRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dialRef.current) return;
        gsap.to(dialRef.current, {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: "none"
        });
    }, []);

    return (
        <div className="relative w-full h-64 flex items-end justify-center overflow-hidden">
            <div className="absolute bottom-0 w-[120%] h-[120%] border-t-[1px] border-dashed border-charcoal/20 rounded-full" ref={dialRef} />
            <div className="absolute bottom-0 w-full h-[1px] bg-charcoal/30" />
            <div className="relative z-10 flex gap-8 mb-4">
               {['Discovery', 'Planning', 'Execution', 'Verification'].map((step, i) => (
                   <div key={step} className="flex flex-col items-center gap-2">
                       <span className={cn(
                           "text-[10px] uppercase tracking-[0.2em] transition-all",
                           i === 1 ? "font-bold text-charcoal border-b border-charcoal" : "opacity-40"
                       )}>
                           {step}
                       </span>
                       <div className={cn("w-2 h-2 rounded-full", i === 1 ? "bg-charcoal" : "bg-taupe/20")} />
                   </div>
               ))}
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <NoiseOverlay />
      <BackgroundDrift />
      <FloatingEchoPanel />

      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-50 mix-blend-darken">
        <h1 className="text-xl font-clash font-bold">Superdesign.</h1>
        <span className="text-[10px] font-satoshi uppercase tracking-widest opacity-60">
          New Swarm Setup
        </span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-32 space-y-48">
        
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-12">
          <motion.h1 
            className="text-[128px] leading-[0.8] tracking-[-0.04em] font-medium"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Design at the <br />
            <span className="italic font-normal serif">speed of thought.</span>
          </motion.h1>
          <motion.p 
            className="max-w-md text-xl text-taupe opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Omni-Dev is your autonomous hyper-agent swarm. Build, deploy, and scale with high-fidelity intelligence.
          </motion.p>
          <motion.button 
            className="group flex flex-col items-center gap-4 mt-8"
            whileHover={{ y: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
              <ArrowDown className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Initialize Mission</span>
          </motion.button>
        </section>

        {/* Archetype Grid */}
        <section className="space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-taupe font-bold">Step 01</span>
            <h2 className="text-6xl font-clash font-bold tracking-tight">Select your swarm archetype.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArchetypeCard 
              icon={<Layout className="w-6 h-6 text-charcoal" />}
              label="Product Strategist"
              description="Orchestrates Notion workspaces, GitHub repos, and the market roadmap."
            />
            <ArchetypeCard 
              icon={<Code className="w-6 h-6 text-charcoal" />}
              label="Deep Engineer"
              description="Writes, tests, and deploys code in autonomous loops via E2B sandboxes."
            />
            <ArchetypeCard 
              icon={<Shield className="w-6 h-6 text-charcoal" />}
              label="Security Architect"
              description="Ensures infrastructure safety and conducts automated audits."
            />
            <ArchetypeCard 
              icon={<Globe className="w-6 h-6 text-charcoal" />}
              label="Growth Orchestrator"
              description="Manages domains, payments via Stripe, and global communications."
            />
          </div>
        </section>

        {/* Success Masonry / Status */}
        <section className="space-y-16 py-32">
            <OrbitalDial />
            <div className="relative h-[500px] w-full mt-24">
                <motion.div 
                    className="absolute top-0 left-0 w-80 p-8 bg-white shadow-2xl rounded-2xl -rotate-2"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                >
                    <Activity className="w-8 h-8 mb-4 text-rose" />
                    <h4 className="text-xl font-bold mb-2">Systems Online</h4>
                    <p className="text-sm text-taupe">All 35 tools successfully mapped to neural pathways.</p>
                </motion.div>
                <motion.div 
                    className="absolute top-10 right-0 w-80 p-8 bg-white shadow-2xl rounded-2xl rotate-3"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                >
                    <HardDrive className="w-8 h-8 mb-4 text-beige" />
                    <h4 className="text-xl font-bold mb-2">Memory Fixed</h4>
                    <p className="text-sm text-taupe">Pinecone vectors initialized for long-term project recall.</p>
                </motion.div>
                <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 p-10 bg-charcoal text-cream shadow-2xl rounded-2xl -rotate-1"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                >
                    <Sparkles className="w-10 h-10 mb-6 text-rose" />
                    <h4 className="text-3xl font-bold mb-3">Studio Ready</h4>
                    <p className="text-base opacity-70">Your autonomous studio environment is fully provisioned and ready for the first objective.</p>
                </motion.div>
            </div>
        </section>

        {/* Completion Section */}
        <section className="flex flex-col items-center text-center space-y-12 py-32">
             <div className="relative">
                 <div className="absolute inset-0 bg-beige/50 blur-[80px] scale-150 animate-pulse" />
                 <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl z-10">
                    <Sparkles className="w-12 h-12 text-charcoal" />
                 </div>
             </div>
             <h2 className="text-8xl font-clash font-bold tracking-tighter">Your studio is ready.</h2>
             <div className="flex gap-4">
                 <button className="px-12 py-5 bg-charcoal text-white rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">
                    Launch Swarm
                 </button>
                 <button className="px-12 py-5 border border-taupe/20 text-taupe rounded-full font-bold hover:bg-taupe/5 transition-colors">
                    Review Plan
                 </button>
             </div>
        </section>

      </main>

      <footer className="w-full py-24 border-t border-taupe/10 text-center opacity-40 text-xs tracking-widest uppercase">
        © 2026 Omni-Dev Autonomous Hyper-Agent Swarm
      </footer>

      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-charcoal origin-left z-[200]" 
        style={{ scaleX }}
      />
    </div>
  );
}

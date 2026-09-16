import { Link } from 'react-router-dom';
import { ArrowRight, Users, BarChart3, Shield, Zap } from 'lucide-react';
import ChatNexusIcon from '../assets/logo.png';

const features = [
  {
    icon: Users,
    tag: 'REALTIME',
    title: 'Live Chat',
    description: 'Instant customer engagement, zero lag.',
  },
  {
    icon: BarChart3,
    tag: 'SMART',
    title: 'Query Resolution',
    description: 'Tickets that close before they escalate.',
  },
  {
    icon: Shield,
    tag: 'ORGANISED',
    title: 'Ticket Management',
    description: 'Priority workflows, live status tracking.',
  },
  {
    icon: Zap,
    tag: 'INSIGHTS',
    title: 'Team Analytics',
    description: 'Performance data that drives decisions.',
  },
];

export default function HomePage() {
  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full h-screen overflow-hidden bg-linear-to-br from-rose-600 to-rose-700">

      {/* diagonal band 1: plain light band */}
      <div
        className="absolute w-[320px] h-[1600px] bg-neutral-100"
        style={{
          top: '-600px',
          right: '18%',
          transform: 'rotate(35deg)',
        }}
      />

      {/* diagonal band 2: dotted band */}
      <div
        className="absolute w-105 h-[1600px]"
        style={{
          top: '-600px',
          right: '-8%',
          transform: 'rotate(35deg)',
          background: '#e5e5e5',
          backgroundImage: 'radial-gradient(circle, #b5b5b5 1px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      />

      <img
        src={ChatNexusIcon}
        alt="ChatNexus Terminal"
        className="absolute top-6 left-8 md:top-10 md:left-16 z-20 h-10 object-contain"
      />

      {/* Hand-drawn geometric accents from the reference */}
      <div className="hero-line hero-line-top" aria-hidden="true" />
      <div className="hero-diamond hero-diamond-top" aria-hidden="true" />
      <div className="hero-angle" aria-hidden="true" />
      <div className="hero-line hero-line-bottom" aria-hidden="true" />

      {/* ── Left content ── */}
      <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 z-10 max-w-sm">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-[10px] font-bold tracking-[0.22em] text-rose-500 shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          UNIFIED SUPPORT INTELLIGENCE
        </div>
        <h1 className="hero-brand-title text-3xl md:text-7xl font-extrabold text-white leading-none">
          CHATNEXUS
        </h1>
        <p className="hero-brand-subtitle text-sm md:text-3xl font-bold tracking-[0.25em] text-white/80 mt-1">
          TERMINAL
        </p>
        <div className="w-14 h-px bg-white/40 my-5" />
        <p className="text-sm md:text-1xl  text-white/80 leading-relaxed">
          Real-Time messaging, and smart ticket routing, and team analytics - one platform, Zero Friction. 
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-rose-100 bg-white px-7 py-3.5 text-xs font-extrabold tracking-[0.2em] text-neutral-900 shadow-xl transition-all hover:border-rose-300 hover:shadow-2xl"
        >
          GET STARTED
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* ── 3D podium, bottom-right of center ── */}
      <div className="absolute bottom-16 right-[8%] md:right-[14%] z-10">
        <div className="relative w-85 max-w-[60vw] h-37.5">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-17.5 rounded-b-[999px]"
            style={{ background: 'linear-gradient(to right, #cfcfcf, #fbfbfb 50%, #cfcfcf)' }}
          />
          <div
            className="absolute bottom-13.5 left-1/2 -translate-x-1/2 w-full h-9 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #e2e2e2)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.10)',
            }}
          />
          <div
            className="absolute bottom-17 left-1/2 -translate-x-1/2 w-[70%] h-12.5 rounded-b-[999px]"
            style={{ background: 'linear-gradient(to right, #c2c2c2, #fafafa 50%, #c2c2c2)' }}
          />
          <div
            className="absolute bottom-26.5 left-1/2 -translate-x-1/2 w-[70%] h-6.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #ececec)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
            }}
          />
        </div>
      </div>
      {/* Feature cards positioned around the illustration */}
      <div className="hero-feature-cards absolute inset-0 z-20 pointer-events-none">
        {features.map((f, i) => {
          const Icon = f.icon;
          const positions = ['hero-card-top', 'hero-card-left', 'hero-card-right', 'hero-card-bottom'];
          return (
            <article
              key={f.title}
              className={`hero-feature-card ${positions[i]} pointer-events-auto bg-white border border-rose-100 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:border-rose-300 transition-all duration-200`}
            >
              <div className="hero-card-bubbles" aria-hidden="true">
                <span className="hero-bubble hero-bubble-one" />
                <span className="hero-bubble hero-bubble-two" />
                <span className="hero-bubble hero-bubble-three" />
                <span className="hero-bubble hero-bubble-four" />
                <span className="hero-bubble hero-bubble-five" />
                <span className="hero-bubble hero-bubble-six" />
                <span className="hero-bubble hero-bubble-seven" />
                <span className="hero-bubble hero-bubble-eight" />
                <span className="hero-bubble hero-bubble-nine" />
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-rose-600" />
                </div>
                <span className="text-[9px] font-bold tracking-widest text-rose-400 uppercase mt-1">
                  {f.tag}
                </span>
              </div>
              <p className="text-sm font-bold text-neutral-900 mb-1">{f.title}</p>
              <p className="text-xs text-neutral-500 leading-relaxed">{f.description}</p>
            </article>
          );
        })}
      </div>
      </div>
    </div>
  );
}

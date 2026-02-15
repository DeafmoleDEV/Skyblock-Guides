import React from 'react';
import { ChevronRight, Shield, Zap, Target, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] left-[10%] w-[40%] h-[40%] bg-necron/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] right-[10%] w-[40%] h-[40%] bg-diamond/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl leading-none uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-necron via-gold to-diamond">Skyblock Meta</span>
          </h1>
          
          <p className="mt-8 text-lg leading-relaxed text-slate-400 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Expert-written guides for Dungeons, Slayers, and Mining. From your first zombie kill to the final Master Mode 7 clear. We’ve got your progression covered.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Link
              to="/guides"
              className="w-full sm:w-auto group relative flex items-center justify-center gap-2 rounded-2xl bg-necron px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-necron/20 hover:scale-105 transition-all duration-300"
            >
              Enter Library
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/guides/f7-gear-guide" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Latest Meta
            </Link>
          </div>
        </div>

        {/* Feature Grid Visual */}
        <div className="mx-auto mt-20 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-1 xl:ml-20">
          <div className="w-full lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-diamond" />}
                title="Dungeon Tactics"
                description="Boss phases, puzzle skips, and high-efficiency clear routes."
                delay="delay-100"
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-gold" />}
                title="Slayer Meta"
                description="Fastest spawn methods and high-DPS melee configurations."
                delay="delay-200"
              />
              <FeatureCard 
                icon={<Target className="w-6 h-6 text-necron" />}
                title="Mining Wealth"
                description="The ultimate path to HOTM 7 and efficient gemstone routes."
                delay="delay-300"
              />
              <FeatureCard 
                icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
                title="Game Wiki"
                description="In-depth database for enchants, pets, and item attributes."
                delay="delay-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <div className={`glass-card p-8 rounded-[2rem] group hover:bg-slate-900/60 animate-in fade-in slide-in-from-right-8 duration-1000 ${delay}`}>
    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-700 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Home;

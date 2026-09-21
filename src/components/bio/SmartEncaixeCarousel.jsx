import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Sparkles, 
  Calendar, 
  Zap, 
  UserCheck, 
  ArrowUpRight 
} from 'lucide-react';

// Dados simulados das vagas de última hora (Smart Encaixe)
const INITIAL_SLOTS = [
  {
    id: 'slot-1',
    procedure: 'Limpeza de Pele + LED',
    professional: 'Dra. Sophie Bennett',
    time: 'Hoje às 16:30',
    discount: '15% OFF',
    condition: 'Encaixe VIP',
    availableCount: 1,
    initialSecondsLeft: 5050,
    whatsappMessage: 'Olá! Vi que abriu uma vaga de última hora para Limpeza de Pele + LED hoje às 16:30 com 15% OFF. Quero garantir essa vaga!'
  },
  {
    id: 'slot-2',
    procedure: 'Aplicação de Botox (1 Área)',
    professional: 'Dr. Lucas Silveira',
    time: 'Amanhã às 10:00',
    discount: 'R$ 150 OFF',
    condition: 'Desistência',
    availableCount: 2,
    initialSecondsLeft: 14200,
    whatsappMessage: 'Olá! Gostaria de reservar o encaixe de amanhã às 10:00 para Botox com R$ 150 OFF.'
  },
  {
    id: 'slot-3',
    procedure: 'Sessão Ultraformer III Facial',
    professional: 'Equipe de Estética',
    time: 'Hoje às 18:00',
    discount: 'Lifting Bônus',
    condition: 'Vaga relâmpago',
    availableCount: 1,
    initialSecondsLeft: 8900,
    whatsappMessage: 'Olá! Quero aproveitar a vaga relâmpago de hoje às 18:00 para Ultraformer III Facial.'
  }
];

// Formatação do tempo do cronômetro (HH:MM:SS)
function formatTimer(seconds) {
  if (seconds <= 0) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Sub-componente do Card Individual
function SlotWidgetCard({ slot, onClaim }) {
  const [secondsLeft, setSecondsLeft] = useState(slot.initialSecondsLeft);

  // Contador regressivo em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="snap-align-start flex-shrink-0 w-[280px] sm:w-[320px] h-[230px] bg-white rounded-3xl p-5 border border-champagne/30 shadow-sm flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-md select-none">
      
      {/* Luz decorativa suave no fundo */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-champagne/20 rounded-full blur-2xl pointer-events-none group-hover:bg-champagne-deep/20 transition-colors" />

      {/* Topo do Card: Badge de Condição & Cronômetro */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 tracking-wider bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite shadow-2xs">
          <Zap className="w-3 h-3 fill-graphite text-graphite" />
          {slot.condition}
        </span>

        {/* Cronômetro estilo Micro-Pill */}
        <div className="flex items-center gap-1.5 bg-graphite/5 border border-champagne/20 px-2.5 py-1 rounded-full text-graphite text-[11px] font-mono font-bold">
          <Clock className="w-3 h-3 text-champagne-deep animate-pulse" />
          <span>{formatTimer(secondsLeft)}</span>
        </div>
      </div>

      {/* Meio do Card: Detalhes do Agendamento */}
      <div className="relative z-10 my-1">
        <div className="flex items-center gap-1.5 text-xs text-brown-muted font-medium mb-1">
          <Calendar className="w-3.5 h-3.5 text-champagne-deep" />
          <span>{slot.time}</span>
          <span className="text-champagne/50">•</span>
          <span className="text-graphite font-bold">{slot.availableCount} vaga disponível</span>
        </div>

        <h3 className="font-display text-base sm:text-lg font-bold text-graphite leading-snug group-hover:text-champagne-deep transition-colors">
          {slot.procedure}
        </h3>
        
        <p className="text-[11px] text-brown-muted flex items-center gap-1 mt-0.5">
          <UserCheck className="w-3 h-3 text-champagne-deep" />
          <span>{slot.professional}</span>
        </p>
      </div>

      {/* Base do Card: Oferta & Botão de Ação */}
      <div className="relative z-10 pt-3 border-t border-champagne/20 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-brown-muted uppercase tracking-wider block">Condição:</span>
          <span className="text-xs font-black text-graphite bg-champagne/20 px-2 py-0.5 rounded-md inline-block border border-champagne/30">
            {slot.discount}
          </span>
        </div>

        {/* Botão Garantir Vaga */}
        <button
          onClick={() => onClaim(slot)}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-bold text-xs transition-all duration-300 flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
        >
          <span>Garantir Vaga</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-graphite" />
        </button>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
export default function SmartEncaixeCarousel({ phoneNumber = '5511999999999' }) {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleClaim = (slot) => {
    const message = encodeURIComponent(slot.whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveDot(index);
      }
    }
  };

  return (
    <section className="py-6 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cabeçalho do Módulo */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 inline fill-champagne-deep" /> Vagas de Última Hora
        </p>
        <h2 className="font-display text-2xl sm:text-3xl text-graphite font-bold">
          Smart Encaixes & Oportunidades
        </h2>
        <p className="text-xs sm:text-sm text-brown-muted font-body mt-1">
          Deslize para conferir as vagas com condições especiais por tempo limitado.
        </p>
      </div>

      {/* Carrossel de Cards por Gestos */}
      <div className="relative max-w-5xl mx-auto">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-2 -mx-2 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {INITIAL_SLOTS.map((slot) => (
            <SlotWidgetCard
              key={slot.id}
              slot={slot}
              onClaim={handleClaim}
            />
          ))}
        </div>

        {/* Indicadores sutis de navegação (Dots inferiores) */}
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {INITIAL_SLOTS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeDot
                  ? 'w-6 bg-champagne-deep'
                  : 'w-1.5 bg-champagne/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
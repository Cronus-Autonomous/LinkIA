import { useState, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import ScrollReveal from './ScrollReveal';

const SERVICES = [
  {
    name: 'Harmonização Facial',
    desc: 'Equilíbrio com bioestimuladores e ácido hialurônico de alta pureza.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/42b214010_generated_image.png',
    duration: '60 min · resultado progressivo',
    tag:''
  },
  {
    name: 'Toxina Botulínica',
    desc: 'Suavização de rugas de expressão com técnica premium e naturalidade.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/7f038b5f6_generated_image.png',
    duration: '30 min · efeito em 7 dias',
    tag: ''
  },
  {
    name: 'Skincare Clínico de Luxo',
    desc: 'Protocolos personalizados com ativos premium para pele radiante.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/ebd9f3a75_generated_image.png',
    duration: '90 min · protocolo 90 dias',
    tag: 'novidade'
  }
];

function ServiceCard({ service, onAskAi }) {
  return (
    <div className="glass-card overflow-hidden h-full flex flex-col group min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-align-start select-none">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={service.img}
          alt={service.name}
          fittingType="fill"
          className="w-full h-full transition-transform duration-700 group-hover:scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 to-transparent" />
        <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-champagne/30 text-[11px] font-medium text-graphite">
          {service.duration}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-graphite mb-1.5">{service.name}</h3>
        <p className="text-[15px] text-brown-muted font-body leading-relaxed mb-4 flex-1">{service.desc}</p>
        <div className="flex-1 flex">
          <button
            onClick={() => onAskAi(`Tenho interesse em: ${service.name}. Pode me explicar?`, service.name)}
            className="gold-button w-full py-2 rounded-full text-sm font-semibold font-body inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-graphite" />
            <span></span>
          </button>
          {service.tag && (
            <button
              className="w-full py-2 rounded-full text-sm font-semibold font-body inline-flex items-center justify-center gap-2"
            >
              <h5 className="text-champagne-deep font-semibold">{service.tag}</h5>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServiceShowcase({ onAskAi }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ScrollReveal>
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-2">
            Vitrine de Procedimentos Premium
          </p>
          {/* <h2 className="font-display text-3xl text-graphite">Procedimentos Premium</h2> */}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="relative group/carousel max-w-5xl mx-auto">
          {/* Seta Esquerda */}
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md border border-champagne/40 text-graphite opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center shadow-lg hover:bg-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Seta Direita */}
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md border border-champagne/40 text-graphite opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center shadow-lg hover:bg-white"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Container do Carrossel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-2 -mx-2 scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SERVICES.map((s) => (
              <ServiceCard key={s.name} service={s} onAskAi={onAskAi} />
            ))}
          </div>

          {/* Indicadores (Dots) */}
          <div className="flex justify-center gap-2 mt-4">
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-champagne-deep' : 'w-1.5 bg-champagne/40'
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
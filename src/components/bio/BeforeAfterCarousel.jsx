import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Users  } from 'lucide-react';
import { Image } from '@/components/ui/image';
import ScrollReveal from './ScrollReveal';

const TRANSFORMATIONS = [
  {
    tag: 'Harmonização Facial',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697300/a1.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697299/d1.png',
    caption: 'Harmonização com ácido hialurônico — resultado em 21 dias',
    length: 221
  },
  {
    tag: 'Skincare Premium',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697516/a2.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697515/d2.png',
    caption: 'Protocolo de skincare clínico — 90 dias de tratamento',
    length: 190
  },
  {
    tag: 'Botox & Toxina',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697668/a3.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789697668/d3.png',
    caption: 'Toxina botulínica — suavização de rugas de expressão',
    length: 330
  },
  {
    tag: 'Bioestimulador de colágeno',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789698478/a4.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789698453/d4.png',
    caption: 'Bioestimulador de colágeno — firmeza que dura até 2 anos',
    length: 730
  },
  {
    tag: 'Preenchimento Labial',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789698645/a5.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789698644/d5.png',
    caption: 'Preenchimento labial — definição natural, sem exageros',
    length: 630
  },
  {
    tag: 'Fios de Sustentação',
    before: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789699111/a6.png',
    after: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789699110/d6.png',
    caption: 'Fios de sustentação — lifting sem cirurgia, resultado imediato',
    length: 130
  },
];

export default function BeforeAfterCarousel({ onAskAi }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActive(i);
    }
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children);
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let dist = Infinity;
    cards.forEach((c, i) => {
      const cardCenter = c.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < dist) { dist = d; nearest = i; }
    });
    setActive(nearest);
  };

  return (
    <ScrollReveal className="py-10">
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-2">Resultados Reais</p>
          <h2 className="font-display text-3xl text-graphite">Transformações Antes & Depois</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => scrollTo(Math.max(0, active - 1))} aria-label="Anterior" className="w-10 h-10 rounded-full pill-quick flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-graphite" />
          </button>
          <button onClick={() => scrollTo(Math.min(TRANSFORMATIONS.length - 1, active + 1))} aria-label="Próximo" className="w-10 h-10 rounded-full pill-quick flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-graphite" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
      >
        {TRANSFORMATIONS.map((t, i) => (
          <div key={i} className="snap-center shrink-0 w-[80%] w-[280px]">
            <div className="glass-card overflow-hidden">
              <div className="px-4 pt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-[11px] font-semibold text-champagne-deep">
                  <Sparkles className="w-3 h-3" /> {t.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-[11px] font-semibold text-white">
                  <Users className="w-3 h-3" /> +{t.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-champagne/20 mt-3">
                <div className="relative bg-white/40">
                  <Image src={t.before} alt="Antes" fittingType="fill" className="w-full h-64" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-graphite/70 text-white text-[11px] font-semibold backdrop-blur-sm">Antes</span>
                </div>
                <div className="relative bg-white/40">
                  <Image src={t.after} alt="Depois" fittingType="fill" className="w-full h-64" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep text-graphite text-[11px] font-semibold">Depois</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-brown-muted font-body">{t.caption}</p>
                {/* <button
                  onClick={() => onAskAi(`Quero saber mais sobre: ${t.tag}`)}
                  className="mt-3 w-full pill-quick py-2.5 rounded-full text-sm font-medium text-graphite inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-champagne-deep" />
                  Perguntar à IA sobre este resultado
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {TRANSFORMATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-7 bg-gradient-to-r from-champagne-light to-champagne-deep' : 'w-1.5 bg-champagne/30'}`}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}
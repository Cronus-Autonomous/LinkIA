import { Sparkles } from 'lucide-react';
import { Image } from '@/components/ui/image';
import ScrollReveal from './ScrollReveal';

const SERVICES = [
  {
    name: 'Harmonização Facial',
    desc: 'Equilíbrio e proporção com bioestimuladores e ácido hialurônico de alta pureza.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/42b214010_generated_image.png',
    duration: '60 min · resultado progressivo'
  },
  {
    name: 'Toxina Botulínica',
    desc: 'Suavização de rugas de expressão com técnica premium e naturalidade.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/7f038b5f6_generated_image.png',
    duration: '30 min · efeito em 7 dias'
  },
  {
    name: 'Skincare Clínico de Luxo',
    desc: 'Protocolos personalizados com ativos premium para pele radiante.',
    img: 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/ebd9f3a75_generated_image.png',
    duration: '90 min · protocolo 90 dias'
  }
];

function ServiceCard({ service, onAskAi, delay }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="glass-card overflow-hidden h-full flex flex-col group">
        <div className="relative h-28 overflow-hidden">
          <Image
            src={service.img}
            alt={service.name}
            fittingType="fill"
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 to-transparent" />
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-champagne/30 text-[11px] font-medium text-graphite">
            {service.duration}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-xl text-graphite mb-1.5">{service.name}</h3>
          <p className="text-[15px] text-brown-muted font-body leading-relaxed mb-4 flex-1">{service.desc}</p>
          <button
            onClick={() => onAskAi(`Tenho interesse em: ${service.name}. Pode me explicar?`, service.name)}
            className="gold-button w-full py-3 rounded-full text-sm font-semibold font-body inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-graphite" />
            Perguntar à IA sobre este procedimento
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ServiceShowcase({ onAskAi }) {
  return (
    <section className="py-2 bg-champagne/15 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-2">Vitrine de Tratamentos</p>
        <h2 className="font-display text-3xl text-graphite">Procedimentos Premium</h2>
        <p className="text-[15px] text-brown-muted mt-2 max-w-xl mx-auto">
          Cada tratamento é personalizado pela nossa IA e conduzido por especialistas certificadas.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.name} service={s} onAskAi={onAskAi} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
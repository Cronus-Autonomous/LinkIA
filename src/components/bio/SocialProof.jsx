import { Star, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const REVIEWS = [
  {
    name: 'Marina A.',
    text: 'Atendimento impecável. A IA me esclareceu tudo antes e o resultado superou minha expectativa.',
    role: 'Harmonização Facial'
  },
  {
    name: 'Carla R.',
    text: 'Senti confiança desde o primeiro contato. Ambiente sofisticado e equipe sensacional.',
    role: 'Skincare Premium'
  },
  {
    name: 'Juliana M.',
    text: 'Agendei pela bio em 2 minutos. Resultado natural, exatamente como conversamos.',
    role: 'Toxina Botulínica'
  }
];

export default function SocialProof() {
  return (
    <ScrollReveal className="py-10">
      <div className="glass-card p-7 sm:p-9 text-center">
        <div className="flex items-center justify-center gap-1 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-6 h-6 text-champagne-deep" fill="#E5C158" />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-6">
          <div>
            <p className="font-display text-4xl gold-text leading-none">+1.500</p>
            <p className="text-xs uppercase tracking-wider text-brown-muted mt-1">transformações</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-champagne/30" />
          <div>
            <p className="font-display text-4xl gold-text leading-none">4,9</p>
            <p className="text-xs uppercase tracking-wider text-brown-muted mt-1">avaliação média</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-champagne/30" />
          <div>
            <p className="font-display text-4xl gold-text leading-none">98%</p>
            <p className="text-xs uppercase tracking-wider text-brown-muted mt-1">recomendam</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-md border border-champagne/25 rounded-2xl p-5">
              <Quote className="w-5 h-5 text-champagne mb-2" />
              <p className="text-[15px] text-graphite font-body leading-relaxed mb-3">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-gold to-champagne-deep flex items-center justify-center text-white text-sm font-semibold">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-graphite">{r.name}</p>
                  <p className="text-[11px] text-brown-muted">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
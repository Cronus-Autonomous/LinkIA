import React, { useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import WhatsAppIcon from './WhatsAppIcon';

// Ícone SVG Oficial do Google
function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Lista de Depoimentos com Diferentes Origens (Google, WhatsApp, Presencial, Site)
const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Marina A.',
    text: 'Atendimento impecável. A IA me esclareceu tudo antes e o resultado superou minha expectativa.',
    role: 'Harmonização Facial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    source: 'google', // 'google' | 'whatsapp' | 'presencial' | 'site'
    rating: 5.0,
    sentiment: 'EXCELENTE',
    images: ['https://res.cloudinary.com/xiupvhfs/image/upload/v1789742187/p1d.png', 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789742187/p1a.png']
  },
  {
    id: 'rev-2',
    name: 'Carla R.',
    text: 'Senti confiança desde o primeiro contato. Ambiente sofisticado e equipe sensacional.',
    role: 'Skincare Premium',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    source: 'whatsapp',
    sentiment: 'EXCELENTE',
    images: []
  },
  {
    id: 'rev-3',
    name: 'Juliana M.',
    text: 'Agendei pela bio em 2 minutos. Resultado natural, exatamente como conversamos.',
    role: 'Toxina Botulínica',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    source: 'google',
    rating: 5.0,
    sentiment: 'ÓTIMO',
    images: ['https://res.cloudinary.com/xiupvhfs/image/upload/v1789742369/p2d.png', 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789742370/p2a.png']
  },
  {
    id: 'rev-4',
    name: 'Fernanda K.',
    text: 'Minha pele mudou completamente após o protocolo. A equipe é super atenciosa no pós!',
    role: 'Peeling Químico',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    source: 'presencial',
    sentiment: 'EXCELENTE',
    images: []
  }
];

// Sub-componente do Card de Depoimento Individual
function ReviewCard({ review }) {
  const cardScrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const hasImages = review.images && review.images.length > 0;
  const totalSlides = 1 + (hasImages ? review.images.length : 0);

  const handleCardScroll = () => {
    if (cardScrollRef.current) {
      const { scrollLeft, clientWidth } = cardScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveSlide(index);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (cardScrollRef.current) {
      const clientWidth = cardScrollRef.current.clientWidth;
      cardScrollRef.current.scrollTo({
        left: clientWidth * index,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  return (
    <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl flex flex-col justify-between shadow-sm border border-champagne/20 relative group/card h-[340px] overflow-hidden">
      {/* Contêiner de rolagem interna do card (Texto + Antes/Depois) */}
      <div
        ref={cardScrollRef}
        onScroll={handleCardScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Slide 0: Texto do Depoimento + Origem */}
        <div className="snap-start flex-shrink-0 w-full h-full p-6 flex flex-col justify-between">
          <div>
            {/* Header com Identificação da Origem da Avaliação */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-champagne/10">
              {review.source === 'google' ? (
                <div className="flex items-center gap-1.5">
                  <GoogleIcon className="w-4 h-4" />
                  <span className="text-[11px] font-bold text-graphite">Avaliação Google</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-extrabold text-graphite">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  {review.source === 'whatsapp' && <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />}
                  {review.source === 'presencial' && <MapPin className="w-3.5 h-3.5 text-amber-600" />}
                  {review.source === 'site' && <Globe className="w-3.5 h-3.5 text-blue-600" />}
                  <span className="text-[11px] font-semibold text-brown-muted capitalize">{review.source}</span>
                </div>
              )}

              {/* Badge de Avaliação Qualitativa */}
              {review.sentiment && (
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-champagne/20 text-champagne-deep uppercase tracking-wider">
                  {review.sentiment}
                </span>
              )}
            </div>

            <Quote className="w-5 h-5 text-amber-400 rotate-180 mb-2 fill-amber-400/20" />
            <p className="text-[14px] text-graphite/80 font-body leading-relaxed line-clamp-4">
              "{review.text}"
            </p>
          </div>

          {/* Dados do Cliente com Foto do Avatar */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-champagne/10">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover border border-champagne/30 shadow-xs"
            />
            <div>
              <p className="text-sm font-bold text-graphite leading-snug">{review.name}</p>
              <p className="text-xs text-brown-muted">{review.role}</p>
            </div>
          </div>
        </div>

        {/* Slides Adicionais: Imagens de Antes e Depois */}
        {hasImages &&
          review.images.map((imgUrl, imgIndex) => (
            <div
              key={imgIndex}
              className="snap-start flex-shrink-0 w-full h-full p-6 flex flex-col justify-between bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${imgUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/20 to-transparent pointer-events-none" />

              <div className="relative z-10 flex justify-end">
                <span className="bg-white/80 backdrop-blur-md text-graphite text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/40">
                  Antes & Depois
                </span>
              </div>

              <div className="relative z-10 flex items-center gap-3 text-white">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/40 shadow-sm"
                />
                <div>
                  <p className="text-sm font-bold leading-snug drop-shadow-sm">{review.name}</p>
                  <p className="text-xs text-white/80 drop-shadow-sm">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Navegação interna do sub-carrossel (Dots + Controles) */}
      {hasImages && (
        <div
          className={`px-6 pb-3 relative z-10 flex items-center justify-between transition-colors ${
            activeSlide > 0 ? 'text-white bg-graphite/40 backdrop-blur-sm' : 'text-graphite bg-white'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToSlide(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeSlide
                    ? 'w-4 bg-amber-400'
                    : activeSlide > 0 ? 'w-1.5 bg-white/40' : 'w-1.5 bg-champagne/30'
                }`}
                aria-label={`Ir para o slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              className="p-1 rounded-full disabled:opacity-30 transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(totalSlides - 1, activeSlide + 1))}
              disabled={activeSlide === totalSlides - 1}
              className="p-1 rounded-full disabled:opacity-30 transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// COMPONENTE PRINCIPAL DE PROVA SOCIAL
export default function SocialProof() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
      }
    }
  };

  return (
    <ScrollReveal className="pb-6 w-full max-w-5xl mx-auto relative">
        <div className="text-start">
          <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-2">
            Depoimentos
          </p>
          {/* <h2 className="hidden sm:flex font-display text-2xl sm:text-3xl text-graphite font-bold">
            Experiências Inspiradoras
          </h2> */}
          <p className="hidden sm:flex text-xs sm:text-sm text-brown-muted font-body mt-1">
            Junte-se a nós e torne-se nossa próxima história de sucesso
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Carrossel Principal com Suporte a Gestos e Drag */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-3 px-2 -mx-2 scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* ================= CARD 1: RESUMO COM TEXTURA DOURADA METÁLICA ================= */}
            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] h-[250px] bg-gradient-to-br from-[#fceabb] via-[#f8b500] to-[#e6a100] text-graphite p-5 rounded-3xl flex flex-col justify-between shadow-md border border-amber-300/60 relative overflow-hidden">
              {/* 1. Sub-card Superior: Nota + Estrelas na esquerda | Logo do Google na direita */}
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="font-display text-xl font-extrabold text-graphite leading-none">
                    4.9 Avaliação
                  </p>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-zinc-100">
                    <GoogleIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tight">
                    Reviews Google
                  </span>
                </div>
              </div>
              {/* 2. Sub-card Inferior: Avatars com Fotos Reais + Contador */}
              <div className="bg-graphite/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-xs flex items-center gap-3">
                <div className="block">
                  <div className="flex -space-x-3 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                      alt="Cliente 1"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
                      alt="Cliente 2"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
                      alt="Cliente 3"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://res.cloudinary.com/xiupvhfs/image/upload/v1790042139/2026-09-21_22-55.png"
                      alt="Cliente 3"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex -space-x-3 overflow-hidden shrink-0">
                    <img
                      src="https://res.cloudinary.com/xiupvhfs/image/upload/v1790042073/2026-09-21_22-52.png"
                      alt="Cliente 1"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://res.cloudinary.com/xiupvhfs/image/upload/v1790042193/2026-09-21_22-56.png"
                      alt="Cliente 2"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://res.cloudinary.com/xiupvhfs/image/upload/v1790042267/2026-09-21_22-57.png"
                      alt="Cliente 3"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                    <img
                      src="https://res.cloudinary.com/xiupvhfs/image/upload/v1790042307/2026-09-21_22-58.png"
                      alt="Cliente 3"
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-base leading-none text-amber-300">+1.500</p>
                  <p className="text-[11px] font-medium text-white/80 mt-0.5">Transformações</p>
                </div>
              </div>
            </div>

            {/* ================= DEMAIS CARDS DE DEPOIMENTOS ================= */}
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Indicadores sutis de navegação inferiores (Dots) */}
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: 1 + REVIEWS.length }).map((_, i) => (
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
  );
}
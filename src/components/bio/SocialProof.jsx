import { useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const REVIEWS = [
  {
    name: 'Marina A.',
    text: 'Atendimento impecável. A IA me esclareceu tudo antes e o resultado superou minha expectativa.',
    role: 'Harmonização Facial',
    images: ['https://res.cloudinary.com/xiupvhfs/image/upload/v1789742187/p1d.png', 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789742187/p1a.png']
  },
  {
    name: 'Carla R.',
    text: 'Senti confiança desde o primeiro contato. Ambiente sofisticado e equipe sensacional.',
    role: 'Skincare Premium',
    images: []
  },
  {
    name: 'Juliana M.',
    text: 'Agendei pela bio em 2 minutos. Resultado natural, exatamente como conversamos.',
    role: 'Toxina Botulínica',
    images: ['https://res.cloudinary.com/xiupvhfs/image/upload/v1789742369/p2d.png', 'https://res.cloudinary.com/xiupvhfs/image/upload/v1789742370/p2a.png']
  }
];

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
      {/* Contêiner de rolagem do card individual */}
      <div
        ref={cardScrollRef}
        onScroll={handleCardScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Slide 0: Texto do Depoimento */}
        <div className="snap-start flex-shrink-0 w-full h-full p-6 flex flex-col justify-between">
          <div>
            <Quote className="w-6 h-6 text-amber-400 rotate-180 mb-3 fill-amber-400/20" />
            <p className="text-[15px] text-graphite/80 font-body leading-relaxed">
              "{review.text}"
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-champagne-deep flex items-center justify-center text-white text-sm font-semibold">
              {review.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-graphite leading-snug">{review.name}</p>
              <p className="text-xs text-brown-muted">{review.role}</p>
            </div>
          </div>
        </div>

        {/* Slides adicionais: Imagens como Background cobrindo o card */}
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
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white text-xs font-semibold">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold leading-snug drop-shadow-sm">{review.name}</p>
                  <p className="text-xs text-white/80 drop-shadow-sm">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Controles do Sub-Carrossel */}
      {hasImages && (
        <div
          className={`px-6 pb-4 relative z-10 flex items-center justify-between ${
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
              className={`p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                activeSlide > 0 ? 'text-white/80 hover:text-white' : 'text-graphite/60 hover:text-graphite'
              }`}
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(totalSlides - 1, activeSlide + 1))}
              disabled={activeSlide === totalSlides - 1}
              className={`p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                activeSlide > 0 ? 'text-white/80 hover:text-white' : 'text-graphite/60 hover:text-graphite'
              }`}
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

export default function SocialProof() {
  const scrollRef = useRef(null);

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <ScrollReveal>
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-4xl text-graphite mb-2">
            Experiências Inspiradoras
          </h2>
          <p className="text-sm text-brown-muted font-body">
            Junte-se a nós e torne-se nossa próxima história de sucesso
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2 -mx-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] bg-amber-400 text-graphite p-7 rounded-3xl flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-graphite text-graphite" />
                  ))}
                </div>
                <p className="font-display text-2xl font-bold tracking-tight">4.9 Avaliação</p>
              </div>

              <div className="mt-12 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-400 bg-rose-gold flex items-center justify-center text-xs font-semibold text-white">
                    M
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-400 bg-champagne-deep flex items-center justify-center text-xs font-semibold text-white">
                    C
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-400 bg-graphite flex items-center justify-center text-xs font-semibold text-white">
                    J
                  </div>
                </div>
                <div>
                  <p className="font-bold text-base leading-none">+1.500</p>
                  <p className="text-xs font-medium text-graphite/80">Transformações</p>
                </div>
              </div>
            </div>

            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => scrollTo('left')}
              className="w-10 h-10 rounded-full bg-white border border-champagne/30 text-graphite flex items-center justify-center shadow-sm hover:bg-champagne/10 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo('right')}
              className="w-10 h-10 rounded-full bg-white border border-champagne/30 text-graphite flex items-center justify-center shadow-sm hover:bg-champagne/10 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Ticket, Sparkles } from 'lucide-react';

const COUPONS = [
  {
    id: 'black-friday',
    tag: 'OFERTA ESPECIAL',
    title: 'Black Friday Estética',
    discount: '40% OFF',
    subtitle: 'Em qualquer protocolo facial de alta tecnologia',
    buttonText: 'Resgatar',
    theme: 'black', // Design escuro/Black Friday
    circleBg: 'bg-amber-400',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
    whatsappMessage: 'Olá! Gostaria de resgatar meu cupom de Black Friday (40% OFF em procedimentos faciais).'
  },
  {
    id: 'boas-vindas',
    tag: 'PRIMEIRA VISITA',
    title: 'Boas-Vindas à Clínica',
    discount: 'R$ 100 OFF',
    subtitle: 'Na sua primeira avaliação + limpeza de pele profunda',
    buttonText: 'Resgatar',
    theme: 'teal', // Inspirado no banner de referência verde/turquesa
    circleBg: 'bg-amber-300',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    whatsappMessage: 'Olá! Vim pelo LinkIA e quero resgatar meu cupom de boas-vindas de R$ 100 OFF.'
  },
  {
    id: 'fidelidade',
    tag: 'CARTÃO FIDELIDADE',
    title: 'Clube VIP de Tratamento',
    discount: 'Grave +1 Ponto',
    subtitle: 'Complete 5 sessões e ganhe uma revitalização',
    buttonText: 'Resgatar',
    theme: 'rose', // Tom rosa/gold suave para fidelidade
    circleBg: 'bg-rose-200',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    whatsappMessage: 'Olá! Quero pontuar no meu Cartão Fidelidade e agendar minha sessão.'
  },
  {
    id: 'combo-body',
    tag: 'EXCLUSIVO DA BIO',
    title: 'Combo Protocolo Corporal',
    discount: '25% OFF',
    subtitle: 'Na contratação do pacote de bioestimuladores',
    buttonText: 'Resgatar',
    theme: 'champagne',
    circleBg: 'bg-amber-200',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    whatsappMessage: 'Olá! Tenho interesse no cupom de 25% OFF no Combo Corporal.'
  }
];

// Estilos de temas baseados na paleta do componente e imagem de referência
const THEME_STYLES = {
  black: {
    cardBg: 'bg-gradient-to-br from-neutral-900 via-zinc-900 to-black text-white border-amber-500/30',
    badge: 'bg-amber-400 text-black font-extrabold',
    title: 'text-zinc-300',
    discount: 'text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]',
    subtitle: 'text-zinc-400',
    button: 'bg-amber-400 hover:bg-amber-300 text-black font-bold shadow-lg shadow-amber-400/20',
    pattern: 'border-amber-400/20'
  },
  teal: {
    cardBg: 'bg-[#12b896] text-white border-emerald-400/30',
    badge: 'bg-white/20 text-white backdrop-blur-md',
    title: 'text-white/90',
    discount: 'text-white drop-shadow-md',
    subtitle: 'text-white/80',
    button: 'bg-white text-[#12b896] hover:bg-emerald-50 font-bold shadow-md',
    pattern: 'border-white/20'
  },
  rose: {
    cardBg: 'bg-gradient-to-br from-rose-400 to-rose-500 text-white border-rose-300/30',
    badge: 'bg-white/20 text-white backdrop-blur-md',
    title: 'text-rose-100',
    discount: 'text-white drop-shadow-md',
    subtitle: 'text-rose-100/90',
    button: 'bg-white text-rose-600 hover:bg-rose-50 font-bold shadow-md',
    pattern: 'border-white/20'
  },
  champagne: {
    cardBg: 'bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-white border-amber-200/30',
    badge: 'bg-black/20 text-white backdrop-blur-md',
    title: 'text-amber-100',
    discount: 'text-white drop-shadow-md',
    subtitle: 'text-amber-100/90',
    button: 'bg-black text-white hover:bg-zinc-900 font-bold shadow-md',
    pattern: 'border-white/20'
  }
};

export default function CouponsCarousel({ phoneNumber = '5511999999999' }) {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveSlide(index);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      const clientWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: clientWidth * index,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  const openWhatsApp = (coupon) => {
    const encodedMsg = encodeURIComponent(coupon.whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <section className="py-8 w-full max-w-4xl mx-auto px-4">
      {/* Cabeçalho do Módulo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 tracking-tight">
            Cupons & Fidelidade
          </h2>
        </div>
        <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-2.5 py-1 rounded-full">
          Deslize para ver mais
        </span>
      </div>

      {/* Janela de Rolagem do Carrossel */}
      <div className="relative group">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full rounded-3xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COUPONS.map((coupon) => {
            const style = THEME_STYLES[coupon.theme] || THEME_STYLES.teal;

            return (
              <div
                key={coupon.id}
                className="snap-start flex-shrink-0 w-full min-h-[220px] sm:min-h-[240px] relative overflow-hidden rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-lg"
              >
                {/* Background base e borda do card */}
                <div className={`absolute inset-0 ${style.cardBg} rounded-3xl border border-solid`} />

                {/* Grafismo decorativo (Anéis curvos de fundo, igual à imagem de referência) */}
                <div
                  className={`absolute -left-10 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 ${style.pattern} pointer-events-none opacity-40`}
                />
                <div
                  className={`absolute -left-16 -bottom-16 w-60 h-60 sm:w-80 sm:h-80 rounded-full border ${style.pattern} pointer-events-none opacity-20`}
                />

                {/* Lado Esquerdo: Textos, Título, Desconto e Botão Resgatar */}
                <div className="relative z-10 flex-1 pr-4 max-w-[60%] sm:max-w-[65%] flex flex-col justify-between h-full">
                  <div>
                    {/* Badge / Tag superior */}
                    <div className="inline-flex items-center gap-1.5 mb-2">
                      <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${style.badge}`}>
                        {coupon.theme === 'black' && <Sparkles className="w-3 h-3 inline mr-1" />}
                        {coupon.tag}
                      </span>
                    </div>

                    {/* Título e Valor do Desconto */}
                    <p className={`text-xs sm:text-sm font-medium ${style.title}`}>
                      {coupon.title}
                    </p>
                    <h3 className={`text-2xl sm:text-4xl font-extrabold tracking-tight my-1 leading-tight ${style.discount}`}>
                      {coupon.discount}
                    </h3>
                    <p className={`text-xs sm:text-sm line-clamp-2 ${style.subtitle}`}>
                      {coupon.subtitle}
                    </p>
                  </div>

                  {/* Botão de Ação: leva direto ao WhatsApp com mensagem personalizada */}
                  <div className="mt-4 sm:mt-6">
                    <button
                      onClick={() => openWhatsApp(coupon)}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 transform active:scale-95 cursor-pointer ${style.button}`}
                    >
                      {coupon.buttonText}
                    </button>
                  </div>
                </div>

                {/* Lado Direito: Círculo de Destaque e Foto de Pessoa (Layout de Referência) */}
                <div className="relative z-10 w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] flex-shrink-0 flex items-center justify-center">
                  {/* Círculo de fundo amarelo/colorido */}
                  <div className={`absolute inset-0 rounded-full ${coupon.circleBg} scale-95 opacity-90 shadow-inner`} />

                  {/* Foto da modelo recortada dentro do círculo */}
                  <img
                    src={coupon.image}
                    alt={coupon.title}
                    className="w-full h-full object-cover rounded-full relative z-10 drop-shadow-md border-2 border-white/40"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Setas de navegação lateral (visíveis no hover ou no desktop) */}
        <button
          onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
          disabled={activeSlide === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-zinc-800 flex items-center justify-center shadow-md disabled:opacity-0 transition-all hover:bg-white"
          aria-label="Cupom anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scrollToSlide(Math.min(COUPONS.length - 1, activeSlide + 1))}
          disabled={activeSlide === COUPONS.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-zinc-800 flex items-center justify-center shadow-md disabled:opacity-0 transition-all hover:bg-white"
          aria-label="Próximo cupom"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicadores de slides (Dots) estilo pílula ativa */}
      <div className="flex justify-center items-center gap-1.5 mt-4">
        {COUPONS.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => scrollToSlide(dotIdx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIdx === activeSlide
                ? 'w-6 bg-amber-500'
                : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
            }`}
            aria-label={`Ir para o cupom ${dotIdx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
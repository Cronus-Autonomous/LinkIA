import React, { useState, useRef } from 'react';
import { Ticket, Sparkles } from 'lucide-react';

const COUPONS = [
  {
    id: 'black-friday',
    tag: 'OFERTA ESPECIAL',
    title: 'Black Friday Estética',
    discount: '40% OFF',
    subtitle: 'Em qualquer protocolo facial de alta tecnologia',
    buttonText: 'Resgatar',
    theme: 'black',
    circleBg: 'bg-champagne-deep',
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
    theme: 'teal',
    circleBg: 'bg-amber-200',
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
    theme: 'rose',
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
    circleBg: 'bg-amber-100',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    whatsappMessage: 'Olá! Tenho interesse no cupom de 25% OFF no Combo Corporal.'
  }
];

// Estilos de temas integrados à paleta de cores padrão
const THEME_STYLES = {
  black: {
    cardBg: 'bg-gradient-to-br from-graphite via-zinc-900 to-black text-white border-champagne/40',
    badge: 'bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-extrabold',
    title: 'text-zinc-300',
    discount: 'text-champagne-deep drop-shadow-sm',
    subtitle: 'text-zinc-400',
    button: 'bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-bold shadow-md',
    pattern: 'border-champagne/20'
  },
  teal: {
    cardBg: 'bg-gradient-to-br from-[#12b896] to-[#0d8a71] text-white border-white/20',
    badge: 'bg-white/20 text-white backdrop-blur-md',
    title: 'text-white/90',
    discount: 'text-white drop-shadow-md',
    subtitle: 'text-white/80',
    button: 'bg-white text-[#12b896] hover:bg-emerald-50 font-bold shadow-md',
    pattern: 'border-white/20'
  },
  rose: {
    cardBg: 'bg-gradient-to-br from-rose-400 to-rose-600 text-white border-white/20',
    badge: 'bg-white/20 text-white backdrop-blur-md',
    title: 'text-rose-100',
    discount: 'text-white drop-shadow-md',
    subtitle: 'text-rose-100/90',
    button: 'bg-white text-rose-600 hover:bg-rose-50 font-bold shadow-md',
    pattern: 'border-white/20'
  },
  champagne: {
    cardBg: 'bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#b8860b] text-graphite border-champagne/40',
    badge: 'bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite backdrop-blur-md font-bold',
    title: 'text-graphite/90',
    discount: 'text-graphite drop-shadow-xs',
    subtitle: 'text-graphite/80',
    button: 'bg-graphite hover:bg-black text-white font-bold shadow-md',
    pattern: 'border-graphite/20'
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

  const openWhatsApp = (coupon) => {
    const encodedMsg = encodeURIComponent(coupon.whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <section className="pb-6 w-full max-w-5xl mx-auto sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cabeçalho do Módulo */}
      <div className="text-start mb-2">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold flex gap-1.5">
          {/* <Ticket className="w-3.5 h-3.5 inline text-champagne-deep" /> */}
          Benefícios Exclusivos
        </p>
        <h2 className="hidden sm:flex font-display text-2xl sm:text-3xl text-graphite font-bold">
          Cupons & Fidelidade
        </h2>
        <p className="hidden sm:flex text-xs sm:text-sm text-brown-muted font-body mt-1">
          Deslize para ver todas as ofertas disponíveis para resgate.
        </p>
      </div>

      {/* Janela de Rolagem do Carrossel */}
      <div className="relative max-w-5xl mx-auto">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-2 -mx-2 scroll-smooth cursor-grab active:cursor-grabbing justify-start sm:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COUPONS.map((coupon) => {
            const style = THEME_STYLES[coupon.theme] || THEME_STYLES.teal;

            return (
              <div
                key={coupon.id}
                className="snap-align-start flex-shrink-0 w-[300px] sm:w-[360px] max-w-[400px] h-[220px] sm:h-[240px] relative overflow-hidden rounded-3xl p-5 sm:p-6 flex items-center justify-between shadow-sm border border-champagne/30 select-none group"
              >
                {/* Background do Card */}
                <div className={`absolute inset-0 ${style.cardBg} rounded-3xl border border-solid`} />

                {/* Grafismo decorativo curvo de fundo */}
                <div
                  className={`absolute -left-10 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 ${style.pattern} pointer-events-none opacity-40`}
                />
                <div
                  className={`absolute -left-16 -bottom-16 w-60 h-60 sm:w-80 sm:h-80 rounded-full border ${style.pattern} pointer-events-none opacity-20`}
                />

                {/* Lado Esquerdo: Textos, Título, Desconto e Botão Resgatar */}
                <div className="relative z-10 flex-1 pr-3 max-w-[62%] sm:max-w-[65%] flex flex-col justify-between h-full">
                  <div>
                    {/* Badge / Tag superior */}
                    <div className="inline-flex items-center gap-1 mb-1.5">
                      <span className={`text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${style.badge}`}>
                        {coupon.theme === 'black' && <Sparkles className="w-3 h-3 inline mr-1 fill-graphite" />}
                        {coupon.tag}
                      </span>
                    </div>

                    {/* Título e Valor do Desconto */}
                    <p className={`text-[11px] sm:text-xs font-medium ${style.title}`}>
                      {coupon.title}
                    </p>
                    <h3 className={`font-display text-xl sm:text-3xl font-extrabold tracking-tight my-0.5 leading-tight ${style.discount}`}>
                      {coupon.discount}
                    </h3>
                    <p className={`text-[11px] sm:text-xs line-clamp-2 ${style.subtitle}`}>
                      {coupon.subtitle}
                    </p>
                  </div>

                  {/* Botão Resgatar */}
                  <div className="mt-2">
                    <button
                      onClick={() => openWhatsApp(coupon)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${style.button}`}
                    >
                      {coupon.buttonText}
                    </button>
                  </div>
                </div>

                {/* Lado Direito: Círculo de Destaque e Foto de Pessoa */}
                <div className="relative z-10 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] flex-shrink-0 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full ${coupon.circleBg} scale-95 opacity-90 shadow-inner`} />
                  <img
                    src={coupon.image}
                    alt={coupon.title}
                    className="w-full h-full object-cover rounded-full relative z-10 drop-shadow-md border-2 border-white/40 pointer-events-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores sutis de navegação (Dots inferiores) */}
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {COUPONS.map((_, dotIdx) => (
            <div
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeSlide
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
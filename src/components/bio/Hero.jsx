import { Check } from 'lucide-react';

const HERO_VIDEO = 'https://media.base44.com/videos/public/6aac04518ddaa9a3b34c4579/34b627279_68569544ba39420cf83604c3ce62ca01_720w.mp4';
const HERO_POSTER = 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/6a86e7519_generated_image.png';
const AVATAR = 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/4104c7cc4_generated_image.png';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-graphite/25 to-graphite/65" />
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-gold/10 via-transparent to-champagne/10" />

      <div className="relative z-10 px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Avatar — photo as circle background */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br from-champagne-light via-rose-gold to-champagne-deep scale-110" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-br from-champagne-light via-champagne-shine to-champagne-deep shadow-xl">
            <div
              className="w-full h-full rounded-full overflow-hidden bg-graphite/10"
              style={{ backgroundImage: `url(${AVATAR})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-[#3897F0] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 text-xs font-semibold mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Assistente IA Online Agora
        </span>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-[48px] leading-tight text-white drop-shadow-sm mb-3">
          Lumen <span className="gold-text">Estética Avançada</span>
        </h1>
        <p className="text-white/90 text-[15px] sm:text-base font-body max-w-lg mx-auto mb-7 drop-shadow">
          Harmonização, skincare de luxo e procedimentos premium com acompanhamento inteligente da nossa IA — do primeiro contato ao pós-care.
        </p>

        <a
          href="https://wa.me/5543996084644?text=Ol%C3%A1!%20Vim%20pela%20bio%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button px-7 py-3.5 text-sm font-semibold font-body"
        >
          Agendar avaliação
        </a>
      </div>
    </section>
  );
}
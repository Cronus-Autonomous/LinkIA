import { Check } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

const HERO_VIDEO = [
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690234/68569544ba39420cf83604c3ce62ca01_720w.mp4',
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690229/48fc489e6131ed14ceec07dab332a8fa_720w.mp4',
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690229/5d576ef597f2b8c305ded7b7f0a4817f_720w.mp4',
];
const HERO_POSTER = 'https://media.base44.com/images/public/6aac04518ddaa9a3b34c4579/6a86e7519_generated_image.png';
const AVATAR = [
  'https://res.cloudinary.com/xiupvhfs/image/upload/f_auto,q_auto/1',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690075/5.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690075/6.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690075/7.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690075/4.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690074/3.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1789690074/2.png'
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-graphite">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 sm:opacity-100"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO[1]} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-graphite/25 to-graphite/65" />
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-gold/10 via-transparent to-champagne/10" />

      <div className="relative z-10 px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Avatar — photo as circle background */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br from-champagne-light via-rose-gold to-champagne-deep scale-110" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] from-champagne-light via-champagne-shine to-champagne-deep shadow-xl">
            <div
              className="w-full h-full rounded-full overflow-hidden bg-graphite/10"
              style={{ backgroundImage: `url(${AVATAR[2]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className=" absolute -bottom-0.5 -right-0.5 w-7 h-7 flex items-center justify-center">
              <VerifiedBadge size={20} color="#1D9BF0" />
            </div>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-[48px] leading-tight text-white drop-shadow-sm mb-3">
          Sua <span className="gold-text">Estética</span>
        </h1>
        <p className="text-white/90 text-[15px] sm:text-base font-body max-w-lg mx-auto mb-7 drop-shadow">
          Realce o que você já tem. Harmonização e skincare de alto padrão, com cuidado que não termina no procedimento.
        </p>
        <a
          href="https://wa.me/5543996084644?text=Ol%C3%A1!%20Vim%20pela%20bio%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button px-7 py-3.5 text-sm font-semibold font-body"
        >
          Agendar avaliação
        </a>

        <span className="opacity-30 inline-flex items-center gap-2 px-2 py-0.5 my-10 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Assistente IA Online Agora
        </span>
      </div>
    </section>
  );
}
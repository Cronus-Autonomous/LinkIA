import { useState, useEffect, useRef } from 'react';
import VerifiedBadge from './VerifiedBadge';
import { AVATARES } from '@/components/bio/SocialProofBadge';

const HERO_VIDEO = [
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690234/68569544ba39420cf83604c3ce62ca01_720w.mp4',
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690229/48fc489e6131ed14ceec07dab332a8fa_720w.mp4',
  'https://res.cloudinary.com/xiupvhfs/video/upload/v1789690229/5d576ef597f2b8c305ded7b7f0a4817f_720w.mp4',
];

const HERO_POSTER = 'https://res.cloudinary.com/xiupvhfs/image/upload/v1790211274/Inserir_um_subt%C3%ADtulo_1.png';

const AVATAR = AVATARES;

const COPY_SLIDES = [
  {
    headline: <>Faça como centenas de empresárias: ative sua assistente de IA, atenda visitantes em segundos e conquiste clientes pagantes no piloto automático.</>,
    subheadline: 'A sua marca merece mais do que um simples link na Bio'
  },
  {
    headline: <>Pare de perder clientes no Link da Bio por <span className="gold-text">demora no atendimento</span>.</>,
    subheadline: 'Turbine sua presença digital com o LinkIA. Uma experiência premium que qualifica seus leads, responde dúvidas 24/7 e fecha agendamentos por você.'
  },
  {
    headline: <>Seu negócio não precisa de mais seguidores. Precisa de um <span className="gold-text">Link que vende</span>.</>,
    subheadline: 'Junte-se a empresárias de destaque e eleve seu posicionamento com uma Bio Inteligente que converte curiosos em clientes recorrentes.'
  },
  {
    headline: <>Ofereça uma experiência <span className="gold-text">5 estrelas</span> antes mesmo do primeiro atendimento.</>,
    subheadline: 'O LinkIA combina inteligência artificial e design de alto padrão para posicionar sua marca no topo e multiplicar suas conversões diariamente.'
  }
];

export default function Hero() {
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentCopyIndex, setCurrentCopyIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef(null);

  // Rotação dos Avatares (a cada 4s)
  useEffect(() => {
    const avatarInterval = setInterval(() => {
      setCurrentAvatarIndex((prev) => (prev + 1) % AVATAR.length);
    }, 4000);
    return () => clearInterval(avatarInterval);
  }, []);

  // Rotação das Copy's com transição de Fade (a cada 8s)
  // useEffect(() => {
  //   const copyInterval = setInterval(() => {
  //     setFade(false);
  //     setTimeout(() => {
  //       setCurrentCopyIndex((prev) => (prev + 1) % COPY_SLIDES.length);
  //       setFade(true);
  //     }, 300);
  //   }, 8000);
  //   return () => clearInterval(copyInterval);
  // }, []);

  // Rotação dos Vídeos (Mobile e Tablet)
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEO.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoIndex]);

  return (
    <section className="relative w-full min-h-[100vh] sm:min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Imagem (Exclusivo para Desktop >= 1024px) */}
      <div 
        className="hidden lg:block absolute inset-0 w-full h-full bg-cover bg-center opacity-20 transition-opacity duration-700"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      />

      {/* Vídeo de fundo (Exclusivo para Mobile e Tablet < 1024px) */}
      <video
        ref={videoRef}
        key={HERO_VIDEO[currentVideoIndex]}
        className="block lg:hidden absolute inset-0 w-full h-full object-cover opacity-40 sm:opacity-30 transition-opacity duration-700"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Máscaras de gradiente para contraste e legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/50 via-graphite/35 to-graphite/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-gold/10 via-transparent to-champagne/10" />

      <div className="relative z-10 px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Avatar rotativo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br from-champagne-light via-rose-gold to-champagne-deep scale-110" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-br from-champagne-light via-champagne-shine to-champagne-deep shadow-xl">
            <div
              className="w-full h-full rounded-full overflow-hidden bg-graphite/10 transition-all duration-500"
              style={{
                backgroundImage: `url(${AVATAR[currentAvatarIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 flex items-center justify-center">
              <VerifiedBadge size={20} color="#1D9BF0" />
            </div>
          </div>
        </div>

        {/* Bloco Copy Dinâmico com suporte a transição fade */}
        <div className={`min-h-[160px] sm:min-h-[140px] flex flex-col items-center justify-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white drop-shadow-sm mb-3">
            {COPY_SLIDES[0].headline}
          </h1>

          <p className="text-white/85 text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed drop-shadow">
            {COPY_SLIDES[0].subheadline}
          </p>
        </div>

        {/* Botão de Ação CTA */}
        {/* <a
          href="https://wa.me/5543996084644?text=Testei%20o%20LinkIA%20e%20quero%20queimar%20meu%20CUPOM%2020%25"
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button px-8 py-4 text-sm sm:text-base font-semibold font-body shadow-lg hover:scale-105 transition-transform mt-6 mb-8"
        >
          Quero meu LinkIA agora
        </a> */}

        {/* Indicator IA Online */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold backdrop-blur-md mt-20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Assistente IA Online Agora
        </span>
      </div>
    </section>
  );
}
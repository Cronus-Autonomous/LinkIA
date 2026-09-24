import React from 'react';

export const AVATARES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1790259801/c9a99adc09e3735dfb59a593d97834b0.jpg',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1790042193/2026-09-21_22-56.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1790042139/2026-09-21_22-55.png',
  'https://res.cloudinary.com/xiupvhfs/image/upload/v1790038103/50171c86420465a36c0e214311e4d7c7.jpg'
];

export default function SocialProofBadge() {
  // Exibe apenas os primeiros 5 avatares para caber harmoniosamente no card
  const visibleAvatares = AVATARES.slice(0, 5);

  return (
    <div className="relative flex flex-col items-center mx-auto pt-2 pb-2.5 px-4 sm:px-6 rounded-[28px] bg-[#E8DFD8]/30 backdrop-blur-lg border border-white/30 shadow-2xl max-w-fit text-center -top-10 z-20">
      
      {/* Seção Superior: Avatares + Número + Texto */}
      <div className="flex items-center gap-3">
        
        {/* Container com -space-x-3 para sobreposição sem cortar */}
        <div className="flex -space-x-3 overflow-hidden py-1 pl-1">
          {visibleAvatares.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Empresária ${index + 1}`}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-[#E8DFD8] object-cover shadow-sm flex-shrink-0 relative"
              style={{ zIndex: visibleAvatares.length - index }} /* Controla qual imagem fica por cima */
            />
          ))}
        </div>

        {/* Texto e Contador */}
        <div className="flex flex-col text-left justify-center shrink-0">
          <span className="text-xs sm:text-[13px] text-graphite font-medium leading-tight">
            +300 empresárias no Brasil
          </span>
        </div>
      </div>
    </div>
  );
}
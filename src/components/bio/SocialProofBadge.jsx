import React from 'react';

// URLs de imagens de perfil genéricas do Unsplash
const AVATARES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop'
];

export default function SocialProofBadge() {
  return (
    <div className="relative flex flex-col items-center mx-auto pt-2 pb-3 px-5 sm:px-7 rounded-[28px] bg-[#E8DFD8]/30 backdrop-blur-lg border border-white/30 shadow-2xl max-w-xs sm:max-w-sm text-center -top-10 z-20">
      
      {/* Seção Superior: Avatares + Número + Texto */}
      <div className="flex items-center gap-3 mb-2.5">
        
        {/* Avatares sobrepostos */}
        <div className="flex -space-x-2.5 overflow-hidden py-1">
          {AVATARES.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Empresária ${index + 1}`}
              className="inline-block h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-2 ring-[#E8DFD8] object-cover shadow-sm"
            />
          ))}
        </div>

        {/* Texto e Contador */}
        <div className="flex flex-col text-left justify-center">
          <span className="font-display font-bold text-lg sm:text-xl leading-none text-[#4A3228]">
            +5.000
          </span>
          <span className="text-xs sm:text-[13px] text-[#785E53] font-medium leading-tight mt-0.5">
            empresárias no Brasil
          </span>
        </div>
      </div>

      {/* Botão de Ação (Pill Button) */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2 px-6 rounded-full bg-[#654335] hover:bg-[#4E3328] text-[#F9F6F0] text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
      >
        Junte-se a nós!
      </a>
    </div>
  );
}
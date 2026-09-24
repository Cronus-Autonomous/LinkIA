import React, { useState, useRef } from 'react';
import { 
  ShoppingBag, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  PackageCheck,
  MessageCircle
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import ScrollReveal from './ScrollReveal';

// Categorias/Procedimentos para o mini-carrossel de filtros
const PROCEDURES = [
  { id: 'all', label: 'Todos' },
  { id: 'skincare', label: 'Skincare Diário' },
  { id: 'peeling', label: 'Peeling Químico' },
  { id: 'botox', label: 'Toxina Botulínica' },
  { id: 'pre-procedimento', label: 'Pré-Procedimento' },
  { id: 'pos-cirurgico', label: 'Pós-Cirúrgico' },
];

// Dados simulados dos produtos Home Care
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sérum Renovador Floral',
    brand: 'Avoskin Bio',
    price: 159.90,
    originalPrice: 189.90,
    tag: 'MAIS VENDIDO',
    tagType: 'bestseller',
    stock: 4,
    bgColor: 'bg-amber-100/60 border-amber-200/50',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    procedures: ['skincare', 'peeling'],
    description: 'Sérum concentrado com extratos florais e ácido hialurônico para regeneração celular e brilho natural.',
    indications: ['Pós-Peeling Químico', 'Pele Opaca ou Desidratada', 'Uso Diário Noturno']
  },
  {
    id: 'prod-2',
    name: 'Creme Reparador Ceramidas',
    brand: 'Leneige Derm',
    price: 189.00,
    originalPrice: 220.00,
    tag: '15% OFF',
    tagType: 'discount',
    stock: 2,
    bgColor: 'bg-champagne/20 border-champagne/30',
    image: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1790038892/45fe5ea486ad474efe8b96bc14d2a3f1.jpg',
    procedures: ['peeling', 'pos-cirurgico', 'skincare'],
    description: 'Restaura a barreira cutânea e acalma a pele sensibilizada por procedimentos invasivos ou queimaduras solares.',
    indications: ['Recuperação Pós-Laser/Peeling', 'Peles Sensíveis', 'Hidratação Profunda 24h']
  },
  {
    id: 'prod-3',
    name: 'Espuma Suave Cleanser Pro',
    brand: 'SkinCare Lab',
    price: 98.90,
    originalPrice: null,
    tag: 'NOVIDADE',
    tagType: 'new',
    stock: 8,
    bgColor: 'bg-rose-50 border-rose-200/40',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    procedures: ['botox', 'pre-procedimento', 'skincare'],
    description: 'Higienização profunda sem agredir o PH fisiológico da pele. Prepara o tecido para absorver os ativos pós-procedimento.',
    indications: ['Higienização Pré-Injetáveis', 'Remoção de Maquiagem', 'Limpeza Diária']
  },
  {
    id: 'prod-4',
    name: 'Protetor Solar FPS 70 com Cor',
    brand: 'DermoShield',
    price: 135.00,
    originalPrice: 150.00,
    tag: 'ESSENCIAL',
    tagType: 'bestseller',
    stock: 3,
    bgColor: 'bg-amber-50 border-amber-200/50',
    image: 'https://res.cloudinary.com/xiupvhfs/image/upload/v1790039606/2026-09-21_22-12.png',
    procedures: ['peeling', 'botox', 'skincare', 'pos-cirurgico'],
    description: 'Proteção contra luz azul e raios UVA/UVB com toque seco e cobertura natural de imperfeições.',
    indications: ['Prevenção de Manchas Pós-Procedimento', 'Uso Diário Ocultador de Vermelhidão']
  }
];

// Sub-componente do Card do Produto com rotação 3D (Flip Effect Corrigido)
function ProductFlipCard({ product, onReserve }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const touchStartX = useRef(0);

  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = Math.abs(touchEndX - touchStartX.current);
    if (diff > 40 && isFlipped) {
      setIsFlipped(false);
    }
  };

  return (
    <div className="snap-align-start flex-shrink-0 w-[270px] sm:w-[300px] h-[400px] [perspective:1000px] group select-none">
      {/* Container 3D */}
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FACE FRONTAL ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl border border-champagne/30 p-4 flex flex-col justify-between [backface-visibility:hidden] shadow-sm bg-white overflow-hidden"
        >
          {/* Topo do Card: Badge e Botão Girar */}
          <div className="flex items-center justify-between z-10">
            {product.tag ? (
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                  product.tagType === 'bestseller'
                    ? 'bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 font-extrabold'
                    : product.tagType === 'discount'
                    ? 'bg-rose-500 text-white'
                    : 'bg-graphite text-white'
                }`}
              >
                {product.tagType === 'bestseller' && <Flame className="w-3 h-3 fill-graphite text-graphite" />}
                {product.tag}
              </span>
            ) : <div />}

            <button
              onClick={handleToggleFlip}
              className="p-2 rounded-full bg-white/90 backdrop-blur-md border border-champagne/30 text-graphite hover:text-champagne-deep transition-colors shadow-xs ml-auto cursor-pointer"
              title="Ver detalhes do produto"
              aria-label="Virar card"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Área da Imagem do Produto */}
          <div className="relative flex-1 flex items-center justify-center my-2 group-hover:scale-105 transition-transform duration-500">
            <div className={`absolute inset-3 rounded-2xl ${product.bgColor} opacity-80`} />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 max-h-[180px] w-auto object-contain drop-shadow-md pointer-events-none"
            />
          </div>

          {/* Painel Inferior de Informações */}
          <div className="bg-graphite/5 border border-champagne/20 rounded-2xl p-3 z-10">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-display text-sm font-bold text-graphite leading-tight">
                  {product.name}
                </h3>
                <p className="text-[11px] text-brown-muted font-body">{product.brand}</p>
              </div>
            </div>

            {/* Preço, Estoque e Botão */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-champagne/20">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-graphite">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-brown-muted line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <PackageCheck className="w-3 h-3 inline text-emerald-600" /> Restam {product.stock} un.
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReserve(product);
                }}
                className="px-3.5 py-2 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-bold text-xs transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-graphite" />
                <span>Reservar</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= FACE TRASEIRA (VERSO CORRIGIDO) ================= */}
        <div
          onClick={handleToggleFlip}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="absolute inset-0 w-full h-full rounded-3xl border border-champagne/40 p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md bg-graphite text-white cursor-pointer"
        >
          {/* Header do Verso */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold text-champagne-deep uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-champagne-deep text-champagne-deep" /> Ficha Técnica
              </span>
              <button
                onClick={handleToggleFlip}
                className="p-1.5 rounded-full bg-white/10 text-champagne-deep hover:bg-champagne-deep hover:text-graphite transition-all cursor-pointer"
                aria-label="Voltar para a frente"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-display text-base font-bold text-white mb-1 leading-tight">{product.name}</h4>
            <p className="text-xs text-white/80 font-body leading-relaxed mb-3 line-clamp-3">
              {product.description}
            </p>

            {/* Indicações do Produto */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-champagne-deep uppercase tracking-wider">Indicado para:</p>
              {product.indications.map((ind, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne-deep shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé do Verso: Botão WhatsApp com área de clique perfeita */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] text-white/60 uppercase">Valor Especial:</p>
              <p className="text-sm font-extrabold text-champagne-deep">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onReserve(product);
              }}
              className="px-3.5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-graphite font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 fill-graphite text-graphite shrink-0" />
              <span>Garantir no Whats</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
export default function HomeCareShowcase({ phoneNumber = '5511999999999' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const productsScrollRef = useRef(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.procedures.includes(selectedCategory));

  const handleReserve = (product) => {
    const text = `Olá! Gostaria de reservar o produto *${product.name}* (R$ ${product.price.toFixed(2)}) listado no Home Care do LinkIA. Há disponibilidade na clínica?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleScroll = () => {
    if (productsScrollRef.current) {
      const { scrollLeft, clientWidth } = productsScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveSlide(index);
      }
    }
  };

  return (
    <ScrollReveal className="pb-6 w-full max-w-5xl mx-auto relative overflow-hidden">
      {/* Cabeçalho do Módulo */}
      <div className="text-start mb-2 ">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-1 gap-1.5">
          {/* <Sparkles className="w-3.5 h-3.5 inline fill-champagne-deep" /> */}
          PRODUTOS
        </p>
        {/* <h2 className="hidden sm:flex font-display text-2xl sm:text-3xl text-graphite font-bold">
          Vitrine Home Care
        </h2>
        <p className="hidden sm:flex text-xs sm:text-sm text-brown-muted font-body mt-1">
          Produtos recomendados para potencializar os resultados do seu procedimento.
        </p> */}
      </div>

      {/* 1. Mini Carrossel de Filtros por Procedimento */}
      <div className="relative mb-2">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-none px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROCEDURES.map((proc) => {
            const isActive = selectedCategory === proc.id;
            return (
              <button
                key={proc.id}
                onClick={() => {
                  setSelectedCategory(proc.id);
                  setActiveSlide(0);
                }}
                className={`snap-align-start flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-bold shadow-xs scale-105'
                    : 'bg-white/80 text-brown-muted border border-champagne/30 hover:bg-champagne/10'
                }`}
              >
                {proc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Carrossel de Cards com Suporte a Gestos e Drag */}
      <div className="relative max-w-5xl mx-auto">
        <div
          ref={productsScrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductFlipCard
                key={product.id}
                product={product}
                onReserve={handleReserve}
              />
            ))
          ) : (
            <div className="w-full py-10 text-center text-brown-muted bg-white/60 rounded-3xl border border-dashed border-champagne/30 text-xs">
              Nenhum produto cadastrado para este procedimento específico.
            </div>
          )}
        </div>

        {/* Indicadores sutis de navegação (Dots inferiores) */}
        {filteredProducts.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {filteredProducts.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide
                    ? 'w-6 bg-champagne-deep'
                    : 'w-1.5 bg-champagne/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
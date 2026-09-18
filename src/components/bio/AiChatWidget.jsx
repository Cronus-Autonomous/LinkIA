import { X, Sparkles, MessageCircle, Users } from 'lucide-react';
import ChatPanel from './ChatPanel';
import WhatsAppIcon from '@/components/bio/WhatsAppIcon'

const PHONE_NUMBER = '5543996084644';

function generateWhatsappLink(messages) {
  const userMessages = messages.filter((m) => m.role === 'user');
  
  let contextText = 'uma avaliação';
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1].text.trim();
    contextText = lastUserMessage;
  }

  // const text = `Olá! Vim do seu LinkIA e gostaria de agendar ${contextText}`
  const text = `Olá! Vim do LinkIA e quero turbinar meu negócio`;
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AiChatWidget({ chat, open, setOpen, contextService }) {
  if (!open) return null;

  const whatsappUrl = generateWhatsappLink(chat.messages);

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-graphite/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full h-[80vh] glass-card rounded-t-3xl rounded-b-none flex flex-col overflow-hidden">
        {/* Header com o botão do WhatsApp */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-champagne/30 bg-white/50 backdrop-blur-md gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne-light to-champagne-deep flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="truncate">
              <p className="font-display text-base leading-none text-graphite truncate">IAra</p>
              <div className="flex items-center justify-center">
                <Users className="w-3 h-3 mr-2 text-emerald-600" />
                <p className="text-[10px] text-emerald-600 font-bold mt-0.5 -ml-1.5">126</p>
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5 ml-1.5">Online agora</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Botão Verde WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#d8f8e4] hover:bg-[#20ba5a] text-[#20ba5a] hover:text-[#d8f8e4] text-xs font-semibold shadow-sm transition-all"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#20ba5a] group-hover:text-[#d8f8e4] transition-colors duration-200" />
              <span>continuar</span>
            </a>

            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-nude-100 text-graphite"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <ChatPanel {...chat} contextService={contextService} compact />
        </div>
      </div>
    </div>
  );
}
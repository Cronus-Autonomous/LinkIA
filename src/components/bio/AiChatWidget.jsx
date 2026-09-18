import { X, Sparkles, MessageCircle } from 'lucide-react';
import ChatPanel from './ChatPanel';

const PHONE_NUMBER = '5543996084644';

function generateWhatsappLink(messages) {
  const userMessages = messages.filter((m) => m.role === 'user');
  
  let contextText = 'uma avaliação';
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1].text.trim();
    contextText = lastUserMessage;
  }

  const text = `Olá! Vim do seu LinkIA e gostaria de agendar ${contextText}`;
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
              <p className="font-display text-base leading-none text-graphite truncate">Assistente IAra</p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Online agora</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Botão Verde WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
              <span>continuar no whatsapp</span>
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
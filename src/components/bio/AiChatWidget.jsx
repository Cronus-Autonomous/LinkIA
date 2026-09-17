import { X, Sparkles } from 'lucide-react';
import ChatPanel from './ChatPanel';

export default function AiChatWidget({ chat, open, setOpen, contextService }) {
  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-graphite/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full h-[80vh] glass-card rounded-t-3xl rounded-b-none flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-champagne/30 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-light to-champagne-deep flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <p className="font-display text-lg leading-none text-graphite">Assistente Lumen</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">🟢 Online agora</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-nude-100"
          >
            <X className="w-5 h-5 text-graphite" />
          </button>
        </div>
        <ChatPanel {...chat} contextService={contextService} compact />
      </div>
    </div>
  );
}
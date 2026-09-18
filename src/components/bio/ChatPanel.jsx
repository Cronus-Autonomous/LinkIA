import { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Sparkles, MessageCircle, ShieldCheck, X } from 'lucide-react';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-white/70 backdrop-blur-md border border-champagne/30 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-1.5 h-1.5 rounded-full bg-champagne-deep"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed font-body rounded-2xl border ${
            isUser
              ? 'rounded-br-md bg-gradient-to-br from-champagne-light to-champagne text-graphite border-champagne/40 shadow-sm'
              : 'rounded-bl-md bg-white/70 backdrop-blur-md text-graphite border-champagne/30 shadow-sm'
          }`}
        >
          {msg.text}
        </div>

        {msg.quickReplies && msg.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {msg.quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => window.dispatchEvent(new CustomEvent('bio-quick-reply', { detail: reply }))}
                className="pill-quick px-3 py-1.5 rounded-full text-xs font-medium text-graphite hover:bg-champagne/20 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPanel({ messages, isTyping, sendMessage, contextService, compact = false }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const handler = (e) => {
      sendMessage(e.detail, contextService);
    };
    window.addEventListener('bio-quick-reply', handler);
    return () => window.removeEventListener('bio-quick-reply', handler);
  }, [sendMessage, contextService]);

  const submit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim(), contextService);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Área de mensagens com rolagem interna */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-4"
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Formulário fixado na parte inferior */}
      <form onSubmit={submit} className="shrink-0 p-3 border-t border-champagne/30 bg-white/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva sua mensagem…"
            className="flex-1 bg-white/80 border border-champagne/30 rounded-full px-4 py-2.5 text-[15px] text-graphite placeholder:text-brown-muted/70 focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className="gold-button w-11 h-11 shrink-0 flex items-center justify-center rounded-full"
          >
            <Send className="w-4.5 h-4.5 text-graphite" />
          </button>
        </div>
        {!compact && (
          <p className="flex items-center gap-1.5 mt-2 text-[11px] text-brown-muted/80 px-1">
            <Sparkles className="w-3 h-3 text-champagne" />
            Atendimento inteligente pela IAra · Respostas em tempo real
          </p>
        )}
      </form>
    </div>
  );
}
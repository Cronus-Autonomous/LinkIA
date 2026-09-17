import { useState, useCallback, useRef } from 'react';

const WEBHOOK_URL = 'https://evolusite.app.n8n.cloud/webhook/bio-inteligente-chat';

const WELCOME = {
  role: 'assistant',
  text: 'Olá! Sou a assistente de IA da Lumen Estética Avançada. Posso ajudar com tratamentos, valores e agendamento. Como posso te atender hoje?',
  quickReplies: ['Ver Tratamentos', 'Valores e Condições', 'Agendar Consulta']
};

export function useChat() {
  const [messages, setMessages] = useState([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionIdRef = useRef(
    'sess_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  );

  const sendMessage = useCallback(async (userMessage, contextService) => {
    if (!userMessage?.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          userMessage,
          contextService: contextService || undefined,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('webhook_failed');

      const data = await res.json().catch(() => ({}));
      const assistantMsg = {
        role: 'assistant',
        text: data.textResponse || 'Recebi sua mensagem! Em instantes trago mais detalhes. ✨',
        quickReplies: Array.isArray(data.quickReplies) ? data.quickReplies : undefined,
        ctaLink: data.ctaLink || undefined
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Estou com uma instabilidade de conexão agora, mas posso já te direcionar ao nosso time humano. Toque em "Agendar via WhatsApp" abaixo. 🌿',
          ctaLink: 'https://wa.me/5543996084644?text=Ol%C3%A1!%20Vim%20pela%20bio%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.',
          quickReplies: ['Tentar novamente', 'Ver Tratamentos']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, isTyping, sendMessage };
}
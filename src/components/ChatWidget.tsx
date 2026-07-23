/* eslint-disable max-lines */
import { useEffect, useRef, useState } from 'react';
import { IoChatbubbleEllipsesOutline, IoClose, IoSend, IoPersonCircleOutline } from 'react-icons/io5';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { API_URL } from '../config/constants';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface VisitorInfo {
  name: string;
  email: string;
  phone: string;
}

const VISITOR_STORAGE_KEY = 'kp_visitor_info';

// Connects to the same /api/chat + /api/conversations backend keshevplus.com
// uses, so conversations show up in the same admin dashboard regardless of
// which site the visitor is chatting from.
export default function ChatWidget() {
  const { t } = useCmsTranslations();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [infoForm, setInfoForm] = useState<VisitorInfo>({ name: '', email: '', phone: '' });
  const [submittingInfo, setSubmittingInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISITOR_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as VisitorInfo;
        if (parsed.name && parsed.email) {
          setInfoForm(parsed);
          setVisitorInfo(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = async () => {
    if (!infoForm.name.trim() || !infoForm.email.trim()) return;
    setSubmittingInfo(true);
    try {
      const res = await fetch(`${API_URL}/api/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: infoForm.name.trim(),
          visitorEmail: infoForm.email.trim(),
          visitorPhone: infoForm.phone.trim(),
        }),
      });
      if (res.ok) {
        const conversation = await res.json();
        setConversationId(conversation.id);
      }
      setVisitorInfo(infoForm);
      localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(infoForm));
    } catch {
      setVisitorInfo(infoForm);
    } finally {
      setSubmittingInfo(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !visitorInfo) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      let currentConversationId = conversationId;
      if (!currentConversationId) {
        const convRes = await fetch(`${API_URL}/api/conversations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorName: visitorInfo.name.trim(),
            visitorEmail: visitorInfo.email.trim(),
            visitorPhone: visitorInfo.phone?.trim() || '',
          }),
        });
        if (convRes.ok) {
          const conversation = await convRes.json();
          currentConversationId = conversation.id;
          setConversationId(currentConversationId);
        }
      }

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages, language: 'he', conversationId: currentConversationId }),
      });
      if (!res.ok) throw new Error('Chat failed');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream');
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let streamOpen = true;
      while (streamOpen) {
        const { done, value } = await reader.read();
        if (done) {
          streamOpen = false;
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              assistantContent += data.content;
              const snapshot = assistantContent;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: snapshot };
                return updated;
              });
            }
          } catch {
            // ignore malformed SSE chunk
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const withoutPending = last?.role === 'assistant' && !last.content ? prev.slice(0, -1) : prev;
        return [...withoutPending, {
          role: 'assistant',
          content: 'שירות הצ\'אט אינו זמין כרגע. ניתן ליצור קשר עם המרפאה בטלפון 055-27-399-27.',
        }];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('chat.open', 'פתח צ\'אט')}
        className="fixed bottom-[76px] left-5 z-[9999] h-14 w-14 rounded-full bg-orange-500 border-2 border-green-700 shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center"
      >
        <IoChatbubbleEllipsesOutline className="h-6 w-6 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-md h-[70vh] max-h-[560px] bg-white rounded-xl shadow-2xl flex flex-col" dir="rtl">
        <div className="flex items-center justify-between gap-2 p-4 border-b bg-green-800 text-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <IoPersonCircleOutline className="h-5 w-5" />
            <span className="font-medium text-sm">{t('chat.assistant_name', 'עוזר וירטואלי - קשב פלוס')}</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label={t('chat.close', 'סגור')} className="p-1 rounded hover:bg-white/10">
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        {!visitorInfo ? (
          <div className="flex-1 flex flex-col justify-center p-6 space-y-3">
            <p className="text-sm text-gray-500 text-center mb-2">{t('chat.before_start', 'לפני שנתחיל, אנא מלאו את הפרטים הבאים:')}</p>
            <input
              value={infoForm.name}
              onChange={(e) => setInfoForm((f) => ({ ...f, name: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, startConversation)}
              placeholder={t('chat.full_name_placeholder', 'שם מלא *')}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 text-right"
            />
            <input
              value={infoForm.email}
              onChange={(e) => setInfoForm((f) => ({ ...f, email: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, startConversation)}
              placeholder={t('chat.email_placeholder', 'אימייל *')}
              type="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 text-right"
            />
            <input
              value={infoForm.phone}
              onChange={(e) => setInfoForm((f) => ({ ...f, phone: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, startConversation)}
              placeholder={t('chat.phone_placeholder', 'טלפון (אופציונלי)')}
              type="tel"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 text-right"
            />
            <button
              type="button"
              onClick={startConversation}
              disabled={!infoForm.name.trim() || !infoForm.email.trim() || submittingInfo}
              className="w-full min-h-[44px] rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold"
            >
              {submittingInfo ? t('chat.starting', 'מתחיל...') : t('chat.start_chat', 'התחל שיחה')}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-gray-500 text-sm pt-8">
                  {t('chat.welcome_message', 'שלום {name}! אני העוזר הווירטואלי של קשב פלוס. איך אוכל לעזור לכם?').replace('{name}', visitorInfo.name)}
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {msg.content || (loading && i === messages.length - 1 ? '…' : '')}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, sendMessage)}
                placeholder={t('chat.type_message', 'הקלידו הודעה...')}
                disabled={loading}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-green-500 text-right"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-12 h-12 shrink-0 rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-gray-400 text-white flex items-center justify-center"
              >
                <IoSend className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

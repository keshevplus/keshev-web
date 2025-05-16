import React, { useRef, useState, useEffect } from 'react';

const AccessibilityWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1001 }}>
      {/* Accessibility Button */}
      <button
        aria-label="תפריט נגישות"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#005cb9',
          color: 'white',
          fontSize: 28,
          border: 'none',
          cursor: 'pointer',
          zIndex: 1001,
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}
      >
        ♿
      </button>
      {/* Accessibility Menu */}
      {open && (
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            bottom: 62,
            right: 0,
            width: 250,
            background: 'white',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            padding: 18,
            zIndex: 1002,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>תפריט נגישות</strong>
            <button
              aria-label="סגור תפריט"
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: '#005cb9', fontSize: 22, cursor: 'pointer' }}
            >×</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <button style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 4, border: '1px solid #e0e0e0', background: '#f5f5f5', cursor: 'pointer' }}>הגדל טקסט</button>
            <button style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 4, border: '1px solid #e0e0e0', background: '#f5f5f5', cursor: 'pointer' }}>הקטן טקסט</button>
            <button style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 4, border: '1px solid #e0e0e0', background: '#f5f5f5', cursor: 'pointer' }}>ניגודיות גבוהה</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;

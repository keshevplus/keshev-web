import React from 'react';

const GoogleMap: React.FC = () => (
  <div>
    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=יגאל+אלון+94+תל+אביב"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#4285F4', color: '#fff', padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, display: 'inline-block'
        }}
      >
        נווט עם Google Maps
      </a>
      <a
        href="https://waze.com/ul?ll=32.0666577,34.7945742&navigate=yes"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#33CCFF', color: '#fff', padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, display: 'inline-block'
        }}
      >
        נווט עם Waze
      </a>
    </div>
    <div style={{ width: '100%', height: '300px', marginBottom: 16, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px #0001' }}>
      <iframe
        title="יגאל אלון 94 תל אביב"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=יגאל+אלון+94+תל+אביב&output=embed"
      ></iframe>
    </div>
  </div>
);

export default GoogleMap;

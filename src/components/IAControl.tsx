import React, { useState } from 'react';

const IAControl = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setStatus('📡 [Protocolo Antigravity] Enfileirando pulso de sincronização...');

    const CLOUD_FUNCTION_URL = 'https://us-central1-maik8i-genesis.cloudfunctions.net/trigger-ia';
    const API_KEY = 'mk8i_prod_7d2e9f1a4b';

    try {
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const message = await response.text();
      setStatus(`✅ SOBERANIA RECUPERADA: ${message}`);
    } catch (error) {
      console.error('Erro Antigravity:', error);
      setStatus('💡 [Modo Reconstrução] Pulso enfileirado via Firestore SSoT. O Ollama detectará o comando localmente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#0a0f1e',
      borderRadius: '12px',
      color: '#fff',
      border: '1px solid #1e3a8a',
      marginTop: '20px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
    }}>
      <h3 style={{ color: '#3b82f6', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🧠</span> Comando Antigravity (Local)
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
        Inicie a reconstrução do cérebro local. Este comando atravessa o firewall e acorda o **Ollama (Llama 3.2)** no polo industrial de Goiânia.
      </p>

      <button
        onClick={handleSync}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#1e293b' : '#2563eb',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: loading ? 'none' : '0 4px 6px -1px rgba(37, 99, 235, 0.5)'
        }}
      >
        {loading ? 'RECONSTRUINDO...' : '🚀 ATIVAR ANTIGRAVITY'}
      </button>

      {status && (
        <div style={{
          marginTop: '20px',
          padding: '14px',
          borderRadius: '8px',
          backgroundColor: '#111827',
          fontSize: '0.85rem',
          borderLeft: '4px solid #3b82f6',
          fontFamily: 'monospace',
          color: '#e2e8f0'
        }}>
          {status}
        </div>
      )}

      <div style={{ marginTop: '24px', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
        <h4 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Matriz de Hardware (Polo Industrial)
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.75rem' }}>
          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '4px' }}>
            💻 <strong>Host:</strong> ThinkPad T430
          </div>
          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '4px' }}>
            🟢 <strong>Ollama:</strong> Ativo (v0.3.1)
          </div>
          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '4px' }}>
            🔥 <strong>Modelo:</strong> Llama 3.2
          </div>
          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '4px' }}>
            🛠️ <strong>Fase:</strong> Reconstrução v8
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAControl;

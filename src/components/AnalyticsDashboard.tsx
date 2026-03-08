import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({ total: 131, processed: 0, pending: 131 });

  // Simulação de carregamento de dados do Firebase
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ total: 131, processed: 28, pending: 103 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Injetado</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 800, margin: '10px 0 0', color: '#111827' }}>{stats.total}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Processado Gemini</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 800, margin: '10px 0 0', color: '#059669' }}>{stats.processed}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fila de Espera</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 800, margin: '10px 0 0', color: '#d97706' }}>{stats.pending}</p>
        </div>
      </div>
      <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px', color: '#1e40af', fontSize: '0.875rem', textAlign: 'center' }}>
        🚀 <strong>Status:</strong> Engine MAIK8I operando em regime de alta performance.
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

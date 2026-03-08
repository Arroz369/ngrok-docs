import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    total: 131,
    processed: 28,
    pendingApproval: 15,
    agent10Active: true,
    agent3Active: true
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Injetado</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 800, margin: '10px 0 0', color: '#111827' }}>{stats.total}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aguardando Aprovação</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 800, margin: '10px 0 0', color: '#d97706' }}>{stats.pendingApproval}</p>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Requer Governança</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', borderRadius: '8px', background: stats.agent10Active ? '#ecfdf5' : '#fef2f2', border: `1px solid ${stats.agent10Active ? '#10b981' : '#ef4444'}` }}>
          <strong>🚜 Agente 10 (Logística):</strong> {stats.agent10Active ? 'Operacional' : 'Offline'}
        </div>
        <div style={{ padding: '15px', borderRadius: '8px', background: stats.agent3Active ? '#ecfdf5' : '#fef2f2', border: `1px solid ${stats.agent3Active ? '#10b981' : '#ef4444'}` }}>
          <strong>🎨 Agente 3 (Criativo):</strong> {stats.agent3Active ? 'Operacional' : 'Offline'}
        </div>
      </div>

      <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px', color: '#1e40af', fontSize: '0.875rem', textAlign: 'center' }}>
        🛡️ <strong>Governança Ativa:</strong> Limites de uso e auditoria de logs habilitados para funcionários.
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

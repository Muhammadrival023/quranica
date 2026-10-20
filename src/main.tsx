import React, { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Quranica React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#020617',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#0f172a',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              ق
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#ffffff' }}>
              Quranica AI Studio
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Terjadi sedikit kendala saat memuat tampilan. Silakan klik tombol di bawah untuk memuat ulang aplikasi ke kondisi awal.
            </p>
            {this.state.error?.message && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '12px',
                color: '#f87171',
                textAlign: 'left',
                margin: '0 0 20px 0',
                fontFamily: 'monospace',
                overflowX: 'auto'
              }}>
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.removeItem('quranica_theme');
                } catch (e) {
                  // ignore
                }
                window.location.reload();
              }}
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10b981, #0d9488)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
              }}
            >
              Muat Ulang Aplikasi (Refresh)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

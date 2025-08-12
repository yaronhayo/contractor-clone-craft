const HealthCheck = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui',
      background: '#f0f0f0'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ color: '#27ae60', margin: '0 0 20px 0' }}>
          Routing Health Check: PASS
        </h1>
        
        <div style={{ 
          background: '#ecf0f1', 
          padding: '20px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <div><strong>URL:</strong> {window.location.href}</div>
          <div><strong>Pathname:</strong> {window.location.pathname}</div>
          <div><strong>Search:</strong> {window.location.search || '(none)'}</div>
          <div><strong>Hash:</strong> {window.location.hash || '(none)'}</div>
          <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
        </div>
        
        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
          React Router is working correctly.<br/>
          This page loaded successfully via client-side routing.
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Go Home
          </button>
          
          <button 
            onClick={() => window.location.href = '/services'}
            style={{
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
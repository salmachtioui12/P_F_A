import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:1214/api/auth/login',
        {
          email: email,
          password: password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || "Échec de la connexion");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        'http://localhost:1214/api/auth/google',
        { credential: credentialResponse.credential },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      
    } catch (error) {
      setError(error.response?.data?.message || "Échec de la connexion Google");
    }
  };

  const handleGoogleFailure = () => {
    setError("Échec de l'authentification Google");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Password"
              required
            />
          </div>

          <div style={styles.options}>
            <div style={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="rememberMe" style={styles.rememberMeLabel}>Remember me</label>
            </div>
            <button 
              type="button" 
              style={styles.forgotPassword}
              onClick={() => navigate('/forget-password')}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>

        <div style={styles.separator}>
          <span style={styles.separatorLine}></span>
          <span style={styles.separatorText}>OR</span>
          <span style={styles.separatorLine}></span>
        </div>

        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            theme="filled_blue"
            size="large"
            width="100%"
          />
        </GoogleOAuthProvider>

        <div style={styles.signupLink}>
          Don't have an account?{' '}
          <a 
            href="/register" 
            style={styles.signupAnchor}
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Sign-up
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '32px',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '24px',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#475569',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
    '&:focus': {
      borderColor: '#94a3b8'
    }
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px 0 16px'
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    margin: 0,
    accentColor: '#3b82f6'
  },
  rememberMeLabel: {
    fontSize: '14px',
    color: '#475569'
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0,
    textDecoration: 'none',
    fontWeight: '500'
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    marginTop: '8px',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#2563eb'
    }
  },
  error: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center'
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    color: '#94a3b8'
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0'
  },
  separatorText: {
    padding: '0 12px',
    fontSize: '14px'
  },
  signupLink: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#64748b',
    fontSize: '14px'
  },
  signupAnchor: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

export default Login;
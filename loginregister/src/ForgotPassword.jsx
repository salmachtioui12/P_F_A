import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:1214/api/auth/forgot-password', 
        { email }, // Changé pour envoyer les données dans le body plutôt que params
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage(`Un email de réinitialisation a été envoyé à ${email}`);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  // Styles CSS en objets JavaScript
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '2rem',
      width: '100%',
      maxWidth: '500px'
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
      fontSize: '1.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#555',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    linkButton: {
      background: 'none',
      border: 'none',
      color: '#4a90e2',
      cursor: 'pointer',
      textDecoration: 'underline',
      padding: 0,
      fontSize: 'inherit'
    },
    alertSuccess: {
      color: '#2ecc71',
      backgroundColor: '#e8f8f0',
      padding: '0.75rem',
      borderRadius: '4px',
      marginBottom: '1rem'
    },
    alertError: {
      color: '#e74c3c',
      backgroundColor: '#fdecea',
      padding: '0.75rem',
      borderRadius: '4px',
      marginBottom: '1rem'
    },
    textCenter: {
      textAlign: 'center',
      marginTop: '1.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Mot de passe oublié</h2>
        
        {message && <div style={styles.alertSuccess}>{message}</div>}
        {error && <div style={styles.alertError}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled)
            }}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
          </button>
        </form>

        <div style={styles.textCenter}>
          <button 
            style={styles.linkButton}
            onClick={() => navigate('/login')}
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
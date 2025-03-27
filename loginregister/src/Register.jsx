import axios from 'axios';
import { useState } from 'react';

function Register() {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:1214/api/auth/register',
        {
          email: inputs.email,
          password: inputs.password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log("Server response:", response.data);
      setSuccess(true);
      setInputs({ email: '', password: '' });

    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>Registration successful!</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="email@example.com"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(!inputs.email || !inputs.password ? styles.buttonDisabled : {}),
            }}
            disabled={!inputs.email || !inputs.password}
          >
            Register
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account? <a href="/login" style={styles.link}>Log in</a>
          </p>
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
    backgroundColor: '#f8f9fa',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '450px'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1.8rem',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#495057',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  input: {
    padding: '0.8rem 1rem',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    '&:focus': {
      border: '1px solid #4a90e2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.2)'
    }
  },
  button: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#3a7bc8',
      transform: 'translateY(-1px)'
    },
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fdecea',
    padding: '0.8rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  },
  success: {
    color: '#2ecc71',
    backgroundColor: '#e8f8f0',
    padding: '0.8rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center'
  },
  footerText: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  link: {
    color: '#4a90e2',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

export default Register;
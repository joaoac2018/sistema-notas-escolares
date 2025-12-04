import React from 'react';
import './LoginPage.css';
import logo from '../../Assets/Logo.png'; // substitua pelo caminho correto do logo

function LoginPage() {
  return (
    <div className="login-container">
      <div className="logo-section">
        <img src={logo} alt="Colégio Atitude Rabisco" className="school-logo" />
          <div className="logo-frase">
            <h2 style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}> 
              Uma escola que cuida bem do seu filho
              </h2>
          </div>
      </div>
      <div className="form-section">
        <h2>Bem-vindos a secretaria online</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
        <p className="role-hint">Acesso para alunos, professores e administradores</p>
      </div>
    </div>
  );
}

export default LoginPage;
import React, { useState } from 'react';
import { loginEmail, signupEmail, loginGoogle } from './firebase';

interface User {
  email: string;
  uid: string;
}

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');

  const handleLogin = (action: 'signin' | 'signup') => {
    if (action === 'signin') {
      loginEmail(email, password)
        .then((result) => {
          const user = result.user;
          loginSuccess(user.email, user.uid);
        })
        .catch((error) => console.log(error));
    } else if (action === 'signup') {
      signupEmail(email, password)
        .then((result) => {
          const user = result.user;
          loginSuccess(user.email, user.uid);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGoogleLogin = () => {
    loginGoogle()
      .then((result) => {
        const user = result.user;
        loginSuccess(user.email, user.uid);
      })
      .catch((error) => console.log(error));
  };

  const loginSuccess = (email: string, uid: string) => {
    setLoginMessage(`Login 성공!\nuid: ${uid}\nemail: ${email}`);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin('signin')}>Sign In</button>
      <button onClick={() => handleLogin('signup')}>Sign Up</button>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <div>{loginMessage}</div>
    </div>
  );
};

export default App;

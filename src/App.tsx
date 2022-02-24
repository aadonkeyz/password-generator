import React, { useState } from 'react';

import PublicKey from './publicKey';
import PrivateKey from './privateKey';
import generatePassword from './generatePassword';

const DEFAULT_PUBLIC_KEY_STRING = `  {
    "name": "关键字",
    "expectedLen": 1,
    "specialStrList": [],
    "isContainCaptial": false,
    "isCaptialFirst": false,
    "desc": "备注"
  }
`;

function App() {
  const [publicKeyString, setPublicKeyString] = useState<string>(
    DEFAULT_PUBLIC_KEY_STRING
  );
  const [privateKeyString, setPrivateKeyString] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleGenerate = () => {
    try {
      const publicKey = new PublicKey(JSON.parse(publicKeyString));
      const privateKey = new PrivateKey(privateKeyString);
      setPassword(generatePassword(publicKey, privateKey));
    } catch (e: any) {
      setPassword(e.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <textarea
        style={{ width: '100%' }}
        defaultValue={DEFAULT_PUBLIC_KEY_STRING}
        rows={10}
        onChange={(e) => setPublicKeyString(e.target.value)}
      />
      <button
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
      >
        toggle input type
      </button>
      <input
        style={{ width: '100%', margin: '0 0 32px 0' }}
        onChange={(e) => setPrivateKeyString(e.target.value)}
        type={type}
      />

      <button onClick={handleGenerate}>hello world</button>

      {password}
    </div>
  );
}

export default App;

import React from 'react';
import { QRCode } from 'react-qrcode-logo';

function App() {
  return (
    <div className="App">
      <h2>QRCode generator</h2>
      <QRCode
        value='https://github.com/rahulshahare'
        size={200}
        bgColor='#fff'
        fgColor='#000'
        eyeRadius={10}
        qrStyle='dots'
      />
    </div>
  );
}

export default App;

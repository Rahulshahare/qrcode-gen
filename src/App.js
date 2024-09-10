import React, { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

function App() {
  const qrCodeRef = useRef(null);

  const downloadQRCode = () =>{
    const canvas = qrCodeRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    a.click();
  }

  return (
    <div className="App">
      <h2>QRCode generator</h2>
        <div ref={qrCodeRef}>
          <QRCode
            value='tel:123456'
            size={200}
            ecLevel='M'
            bgColor='#fff'
            fgColor='#000'
            eyeRadius={10}
            qrStyle='dots'
          />
        </div>
        <button onClick={downloadQRCode}>Download QRCode</button>
    </div>
  );
}

export default App;

import React, { useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';


function App() {
  const qrCodeRef = useRef(null);
  const [qrStyle, SetqrStyle] = useState("squares"); 
  const [eyeRadius, SeteyeRadius] = useState(0);

  const frameStyle = {
    padding: '20px',         // Space between QR code and frame
    border: '5px solid #000', // Frame border (customize thickness and color)
    borderRadius: '15px',     // Rounded corners for the frame
    display: 'inline-block',  // Ensure frame fits tightly around the QR code
    backgroundColor: '#fff',  // Background color of the frame
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
  };

  const downloadQRCode = () =>{
    const canvas = qrCodeRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code-geo.png';
    a.click();
  }

  return (
    <div className="App">
      <h2>QRCode generator</h2>
        <div ref={qrCodeRef} style={frameStyle}>
          <QRCode
            value='geo:0,0?q=20.024778,78.563709(QRCodeGenerator)'
            size={200}
            ecLevel='M'
            bgColor='#fff'
            fgColor='#000'
            eyeRadius={eyeRadius}
            qrStyle= {qrStyle}
            quietZone={10}
          />
        </div>
        <button onClick={downloadQRCode}>Download QRCode</button>

        <div className='qrStyle'>
          <h3>QR Style</h3>
          <button onClick={()=>SetqrStyle("squares")}>Squares</button>
          <button onClick={()=>SetqrStyle("dots")}>Dots</button>
          <button onClick={()=>SetqrStyle("fluid")}>Fluid</button>
        </div>
        <div className='qrStyle'>
          <h3>QR Style</h3>
          <button onClick={()=>SeteyeRadius(0)}>Square</button>
          <button onClick={()=>SeteyeRadius(5)}>Rounded</button>
          <button onClick={()=>SeteyeRadius(50)}>Circle</button>
        </div>
    </div>
  );
}

export default App;

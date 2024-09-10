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
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const qrCanvas = qrCodeRef.current.querySelector('canvas');
    const qrCodeSize = qrCanvas.width;

    const framePadding = 40;
    const frameSize = qrCodeSize + framePadding * 2;

    canvas.width = frameSize;
    canvas.height = frameSize;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, frameSize, frameSize);

    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.strokeRect(10, 10, frameSize - 20, frameSize - 20);

    const image = new Image();
    image.src = 'data:image/jpeg;base64,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'; // Replace with the image URL or path
    image.onload = () => {
      const imgWidth = frameSize - 40; // Adjust image size
      const imgHeight = (image.height / image.width) * imgWidth;
      
      // Draw the image inside the frame, centered and scaled
      context.drawImage(image, 0, 0, imgWidth, imgHeight);

    context.drawImage(qrCanvas, framePadding, framePadding, qrCodeSize, qrCodeSize);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr-code-frame.png';
    link.click();
    };
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

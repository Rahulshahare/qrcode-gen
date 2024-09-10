import React, { useRef, useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { toPng, toSvg, toJpeg } from 'html-to-image';

import Square from './assets/square-svgrepo-com.svg';
import RoundedSquare from './assets/black-rounded-square-shape-svgrepo-com.svg';
import Circle from './assets/circle-svgrepo-com.svg';

import faceBookLogo from './socialMediaLogos/faceBookLogo.svg';
import instagramLogo from './socialMediaLogos/instagramLogo.svg';
import linkedInLogo from './socialMediaLogos/linkedInLogo.svg';
import telegramLogo from './socialMediaLogos/telegramLogo.svg';
import twitterLogo from './socialMediaLogos/twitterLogo.svg';
import whatsAppLogo from './socialMediaLogos/whatsAppLogo.svg';
import youTubeLogo from './socialMediaLogos/youTubeLogo.svg';
import noImage from './socialMediaLogos/no-image-svgrepo-com.svg'
import './index.css'

function App() {
  const qrCodeRef = useRef(null);
  const [qrStyle, SetqrStyle] = useState("squares"); 
  const [eyeRadius, SeteyeRadius] = useState(0);
  const [qrContent, SetqrContent] = useState('tel:727610182000');
  const [qrLogoImage, SetqrLogoImage] = useState(null);
  const [title, SetTitle] = useState('TO CONTACT');
 
  
  
  const frameStyle = {
    padding: '20px',         // Space between QR code and frame
    border: '5px solid #000', // Frame border (customize thickness and color)
    borderRadius: '15px',     // Rounded corners for the frame
    display: 'inline-block',  // Ensure frame fits tightly around the QR code
    backgroundColor: '#000',  // Background color of the frame
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const SetData = (data, title) =>{
    SetqrContent(data)
    SetTitle(title)
  }

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const downloadQRCode = () =>{
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const qrCanvas = qrCodeRef.current.querySelector('canvas');
    const qrCodeSize = qrCanvas.width;

    const framePadding = 40;
    const frameSize = qrCodeSize + framePadding * 2;
    const borderRadius = 30; 

    canvas.width = frameSize;
    canvas.height = frameSize;

    context.fillStyle = '#ffffff';
    drawRoundedRect(context, 0, 0, frameSize, frameSize, borderRadius);
    context.fill();

    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    drawRoundedRect(context, 10, 10, frameSize - 20, frameSize - 20, borderRadius);
    context.stroke();

    context.drawImage(qrCanvas, framePadding, framePadding, qrCodeSize, qrCodeSize);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr-code-frame.png';
    link.click();
    
  }
 
  

  const downloadQRCodeHtml = (format = 'png') => {
    const node = qrCodeRef.current;  // Reference to the QR code container

    // Choose the correct export format
    const exportFunc = format === 'svg' ? toSvg : (format === 'jpeg' ? toJpeg : toPng);

    exportFunc(node, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `qr-code.${format}`;
        link.click();
      })
      .catch((err) => {
        console.error('Something went wrong during the export:', err);
      });
  };
  

  return (
    <div className="App">
      
      <div className='preview'>
      <h2>QRCode generator</h2>
        <div ref={qrCodeRef} style={frameStyle} className='frameStyleCss'>
          <h3>SCAN ME<br/><span>{title}</span></h3>
          <QRCode
            value={qrContent}
            size={300}
            ecLevel='M'
            bgColor='#fff'
            fgColor='#00796B'
            eyeRadius={eyeRadius}
            eyeColor='#388E3C'
            qrStyle= {qrStyle}
            quietZone={10}
            logoImage={qrLogoImage ? qrLogoImage : undefined}
            logoPaddingStyle='circle'
            logoPadding={0}
            logoHeight={30}
            logoWidth={30}
            removeQrCodeBehindLogo={true}
          />
        </div> 
        <h3>Download QRCode</h3>
        <button onClick={()=>downloadQRCodeHtml('png')}>Download QRCode as PNG</button>
        <button onClick={()=>downloadQRCodeHtml('svg')}>Download QRCode as SVG</button>
      </div>
      <div className='setting'>

        <div className='qrContent'>
          <h3>QR Content</h3>
          <button onClick={()=>SetData('https://www.youtube.com/watch?v=i71xHiYijMI','FOR LINK')}>Link</button>
          <button onClick={()=>SetData('tel:8999445733','TO CONTACT')}>Phone</button>
          <button onClick={()=>SetData('geo:0,0?q=20.024778,78.563709(Treasure)','FOR GPS L')}>GPS</button>
          <button onClick={()=>SetData('WIFI:T:WPA;S:wizkumar;P:000000;H:;;','FOR WIFI')}>WIFI</button>
          <button onClick={()=>SetData('SMSTO:7276101829:hello this is qr','FOR SMS')}>SMS</button>
          <button onClick={()=>SetData('mailto:abc@xyz.com?body=its%20good&subject=this%20is%20qr','FOR EMAIL')}>Email</button>
          <button onClick={()=>SetData("https://wa.me/7276101829?text=I'm%20interested%20in%20your%20car%20for%20sale",'FOR WHATSAAP')}>Whatsaap</button>
          
         
        </div>

        <div className='qrStyle'>
          <h3>QR Style</h3>
          <button onClick={()=>SetqrStyle("squares")}>Squares</button>
          <button onClick={()=>SetqrStyle("dots")}>Dots</button>
          <button onClick={()=>SetqrStyle("fluid")}>Fluid</button>
        </div>
        <div className='qrStyle'>
          <h3>QR Eye Style</h3>
          <img src={Square} onClick={()=>SeteyeRadius(0)} title="Squaare"/>
          <img src={RoundedSquare} onClick={()=>SeteyeRadius(5)} title="Rounded Square"/>
          <img src={Circle} onClick={()=>SeteyeRadius(50)} title="Circle"/>
        </div>
        <div className='qrLogoImages'>
          <h3>QR Logo images</h3>
          <img src={noImage} onClick={()=>SetqrLogoImage()} title='None'/>
          <img src={faceBookLogo} onClick={()=>SetqrLogoImage(faceBookLogo)} title='Facebook'/>
          <img src={instagramLogo} onClick={()=>SetqrLogoImage(instagramLogo)} title='Instagram'/>
          <img src={linkedInLogo} onClick={()=>SetqrLogoImage(linkedInLogo)} title='LinkedIn'/>
          <img src={telegramLogo} onClick={()=>SetqrLogoImage(telegramLogo)} title='Telegram'/>
          <img src={twitterLogo} onClick={()=>SetqrLogoImage(twitterLogo)} title='Twitter'/>
          <img src={whatsAppLogo} onClick={()=>SetqrLogoImage(whatsAppLogo)} title='WhatsApp'/>
          <img src={youTubeLogo} onClick={()=>SetqrLogoImage(youTubeLogo)} title='Youtube'/>
        </div>
      </div>
    </div>
  );
}

export default App;

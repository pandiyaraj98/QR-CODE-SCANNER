import { useState } from 'react';
import './App.css';

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("")
  const [qrSize, setQrSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);

    }
    catch (error) {
      console.error("Error generating QR code", error);
    }
    finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      }).catch(error => console.log("Error downloading QR code", error))
  }
  return (
    <>
      <div className='App container'>
        <h1 className='text-center my-5 py-2 fw-bolder shadow'>QR Code Generator</h1>
        <div className='box p-5 my-5'>
          <div className='text-center'>
            {loading && <p>Please wait...</p>}
            <img src={img} className='qr-image border p-2 shadow' alt='Empty' />
          </div>
          <div className='label-float mt-5'>
            <input className='input' type='text' value={qrData} placeholder='Paste or Enter url link' onChange={(e) => setQrData(e.target.value)} />
            <label htmlFor='data-input' className='input-labe '>
              Enter URL Link
            </label>
          </div>
          <div className='label-float'>
            <input className='input' type='number' value={qrSize} placeholder='Enter image size' onChange={(e) => setQrSize(e.target.value)} />
            <label htmlFor='data-input' className='input-label' >
              Enter Image size (e.g., 150)
            </label>
          </div>
          <div className='buttons mt-4'>
            <button className='generate-btn btn btn1 fw-bold py-3 px-4 me-2' disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-btn btn btn2 fw-bold py-3 px-4 mt-sm-2 mt-md-2 mt-lg-0' onClick={downloadQR}>Download QR Code</button>
          </div>
        </div>
      </div>
      <footer class=" text-center">
          <p className='text-white fw-light'>Designed by <span className='text-danger'>&#10084;</span> <span className='text-dark'>Pandiyaraj</span></p>
      </footer>
    </>
  );
}

export default App;

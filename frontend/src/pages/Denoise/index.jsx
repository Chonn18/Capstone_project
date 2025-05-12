import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_notext.png";
import Nav from "../../components/Navbar/Navbar2";
import Footer from "../../components/Footer/Footer";
import API from "../../API";

const Denoise = () => {
const [imageURL, setImageURL] = useState("");
const [preview, setPreview] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const fileInputRef = useRef(null);

useEffect(() => {
    if (imageURL && imageURL.startsWith("http")) {
        setPreview(imageURL);
    }
    }, [imageURL]);

const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setPreview(reader.result);
        setImageURL("");
    };
    reader.readAsDataURL(file);
};

const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
};

const handleDragOver = (e) => {
    e.preventDefault();
};

const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
};

//   const handleDenoise = () => {
//     const source = preview || imageURL;
//     if (!source) {
//       alert("Please upload an image or paste a valid image URL.");
//       return;
//     }
//     setIsLoading(true);
//     console.log("Denoising image from:", source);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       alert("Denoising complete! (fake)");
//     }, 3000);
//   };

const handleDenoise = async () => {
    if (!preview) {
        alert("Please upload an image.");
        return;
    }

    setIsLoading(true);

    try {
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    const response = await API.post("/denoise", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "json", // dùng json nếu ảnh là base64
    });

    if (response.status === 200) {
        const { image_base64, info } = response.data;

        // Chuyển sang trang /result với dữ liệu
        navigate("/result", {
        state: {
            resultImage: `data:image/png;base64,${image_base64}`,
            info,
        },
        });
    }
    } catch (error) {
    console.error("Error sending image:", error);
    alert("Failed to denoise image.");
    } finally {
    setIsLoading(false);
    }

};


  return (
    <div>
        
      <Nav />
      
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 mt-6">
        
        <div className="w-full max-w-[1400px] grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          {/* Left */}
          <div className="w-full">
            <div className="flex items-center gap-4 py-2">
              <img src={logo} className="h-40 w-auto" alt="CTGenix Logo" />
            </div>
            <h1 className="text-5xl font-bold text-headercolor mb-4">Denoise Image</h1>
            <p className="text-gray-600 text-2xl">Make your image clearer</p>
          </div>

          {/* Right */}
          <div className="relative bg-white p-8 rounded-2xl border border-gray-300 shadow-xl text-center w-full min-h-[550px] flex flex-col justify-start items-center overflow-hidden">
            
            {/* Overlay Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-xanhngoc border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xl text-headercolor font-semibold">Processing...</p>
              </div>
            )}

            {/* Nếu có preview thì hiển thị ảnh, che các phần còn lại */}
            {preview ? (
              <div className="relative w-full">
                <button
                  onClick={() => {
                    setPreview(null);
                    setImageURL("");
                  }}
                  className="absolute top-2 right-2 bg-white/70 hover:bg-red-500 text-gray-800 hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg backdrop-blur transition z-10"
                  title="Remove Image"
                >
                  ✕
                </button>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto rounded-lg border shadow-xl"
                />

                <button
                  onClick={handleDenoise}
                  className="bg-white text-headercolor border border-headercolor px-6 py-3 font-semibold text-xl hover:bg-headercolor hover:text-white rounded-lg mt-4"
                >
                  DENOISE
                </button>
              </div>
            ) : (
              <>
                {/* Upload & Drag-drop */}
                <div
                  className="border-2 border-dashed border-gray-400 p-8 rounded-lg mb-8 cursor-pointer hover:border-xanhngoc w-full"
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-8xl mb-4">📁</span>
                    <p className="text-3xl font-bold text-headercolor">Upload or Drop image</p>
                    <p className="text-lg text-gray-400 mt-3">
                      Supports .jpeg, .png, .webp, .gif, .tiff, .bmp <br />
                      Max 10MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* OR separator */}
                <div className="flex items-center my-6 w-full">
                  <hr className="flex-grow border-gray-500" />
                  <span className="mx-4 text-gray-600 text-xl">OR</span>
                  <hr className="flex-grow border-gray-500" />
                </div>

                {/* URL input */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
                  <input
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="Paste image URL here"
                    className="w-full px-5 py-3 outline-none text-gray-700 text-xl"
                  />
                </div>

                {/* DENOISE button */}
                
              </>
            )}
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Denoise;

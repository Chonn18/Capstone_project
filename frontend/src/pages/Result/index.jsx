import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import gt from "../../assets/gt.jpg";      
import pred from "../../assets/pred.png"
import Nav from "../../components/Navbar/Navbar2";
import Footer from "../../components/Footer/Footer";

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Nhận ảnh gốc và ảnh kết quả từ state
    const originalImage = state?.originalImage || "../../assets/gt.jpg"; 
    const resultImage = state?.resultImage || "../../assets/pred.png";   
    const fileName = state?.fileName;

    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openImage = (src) => setFullscreenImage(src);
    const closeImage = () => setFullscreenImage(null);

    return (
        <div className="py-12 flex-1">
            <Nav />

            {/* Header + Back Button */}
            <div className="w-full mx-auto px-6 py-10">
                <button
                    onClick={() => navigate("/denoise")}
                    className="mb-6 text-headercolor hover:underline text-xl font-semibold mt-8"
                >
                    ← Back
                </button>
                <h1 className="text-5xl font-bold mb-8 mx-8 text-gray-800">Denoising Result</h1>

                {/* Image Comparison Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8">
                    {/* Original */}
                    <div className="flex-1 text-center">
                        <img
                            src={originalImage}  // Hiển thị ảnh gốc từ state
                            alt="Original"
                            className="w-full max-w-lg mx-auto rounded-lg border cursor-zoom-in"
                            onClick={() => openImage(originalImage)}
                        />
                    </div>

                    {/* Arrow */}
                    <FiArrowRight className="text-9xl text-headercolor hidden md:block" />

                    {/* Result */}
                    <div className="flex-1 text-center h-full">
                        <img
                            src={resultImage}  // Hiển thị ảnh kết quả từ state
                            alt="Denoised Result"
                            className="w-full max-w-lg mx-auto rounded-lg border cursor-zoom-in"
                            onClick={() => openImage(resultImage)}
                        />

                        {/* Download Button */}
                        {/* <div className="flex justify-center mt-6">
                            <a
                                href={resultImage}
                                download = {`denoised_${fileName}`}
                                className="px-6 py-2 bg-headercolor text-white rounded-lg hover:bg-opacity-80 transition text-lg"
                            >
                                ⬇ Download Image
                            </a>
                        </div> */}
                    </div>
                </div>

                {/* Metadata */}
                {/* {info && (
                    <div className="mt-10 text-gray-700 text-lg bg-gray-50 rounded-lg p-4 border">
                        <p><strong>Filename:</strong> {info.filename}</p>
                        <p><strong>Size:</strong> {info.size[0]} × {info.size[1]} px</p>
                        <p><strong>Processing time:</strong> {info.processing_time} sec</p>
                    </div>
                )} */}
            </div>

            <Footer />

            {/* Fullscreen image modal */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
                    onClick={closeImage}
                >
                    <img
                        src={fullscreenImage}
                        alt="Fullscreen View"
                        className="h-full max-w-full max-h-[1080px] rounded-lg shadow-xl"
                    />
                </div>
            )}
        </div>
    );
};

export default Result;

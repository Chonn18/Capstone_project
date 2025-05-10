import React, { useState, useEffect } from 'react';
import API from "../../API";

function Import() {
  const [files, setFiles] = useState([]);
  const [loadingFile, setLoadingFile] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [currentFiles, setCurrentFiles] = useState([]); // Các file hiển thị trên trang hiện tại
  const [indexOfLastFile, setIndexOfLastFile] = useState(0); // Index của file cuối cùng trên trang hiện tại
  const [indexOfFirstFile, setIndexOfFirstFile] = useState(0); // Index của file đầu tiên trên trang hiện tại
  const filesPerPage = 5; // Số file hiển thị mỗi trang

  // Lấy file từ localStorage khi component được load
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await API.get('/files');
        if (response.status === 200) {
          setFiles(response.data);
          setCurrentFiles(response.data.slice(0, filesPerPage))
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchFiles();
  }, []);

   // Tính toán các file hiển thị trên trang hiện tại
   useEffect(() => {
    const lastFileIndex = currentPage * filesPerPage;
    const firstFileIndex = lastFileIndex - filesPerPage;
    setIndexOfLastFile(lastFileIndex)
    setIndexOfFirstFile(firstFileIndex)
    setCurrentFiles(files.slice(firstFileIndex, lastFileIndex))
  }, [currentPage])

  // // Cập nhật lại localStorage mỗi khi files thay đổi
  useEffect(() => {
    const lastFileIndex = currentPage * filesPerPage;
    const firstFileIndex = lastFileIndex - filesPerPage;
    setCurrentFiles(files.slice(firstFileIndex, lastFileIndex))
  }, [files]);

  // Xử lý khi upload file
  const handleFileUpload = (file) => {
    if (file) {
      setFiles((prevFiles) => [
        
        { name: file.name, size: file.size, status: 'New', file },
        ...prevFiles,
      ]);
    }
  };

  // Xử lý khi người dùng chọn file từ input
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  // Xử lý khi xóa file
  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== fileName));
  };

  // Xử lý khi import file
  const handleImportFile = async (fileName) => {
    setLoadingFile(fileName);
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.filename === fileName ? { ...file, status: 'processing' } : file
      )
    );
    try {
      const response = await API.post('/files/import', { filename: fileName });
      if (response.status === 200) {
        console.log(response.data)
        setLoadingFile(null);
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.filename === fileName ? { ...file, status: 'completed' } : file
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Xử lý phần preview
  const handlePreviewFile = (file) => {
    setPreviewFile(file.name);
    setPreviewContent(`Nội dung của file ${file.name}`);
  };

  const closePreview = () => {
    setPreviewContent(null);
    setPreviewFile(null);
  };
  
  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="relative w-full h-fit">
      <div className="flex flex-col items-center justify-center w-full mx-auto my-6">
        <h1 className="text-3xl font-bold text-sky-800">Import your files</h1>

        <div
          className="border-2 border-dashed border-gray-300 p-8 max-w-lg w-full flex flex-col items-center mt-6 "
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleFileUpload(file);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500 hover:text-gray-950"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm7 6V7h2v4h3l-4 4-4-4h3z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mt-2 text-gray-500">Upload or drop files</p>
        </div>

        <input
          type="file"
          accept=".docs, .pdf, .txt"
          className="hidden"
          id="fileInput"
          onChange={handleInputChange}
        />
        <label
          htmlFor="fileInput"
          className="mt-4 bg-sky-700 hover:bg-sky-900 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload
        </label>

        {/* Table hiển thị các file */}
        <table className="max-w-4xl w-full mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Size</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Import</th>
              <th className="p-2 border">Delete</th>
              <th className="p-2 border">Review</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.map((file) => (
              <tr key={file.filename} className="text-center">
                <td className="p-2 border">{file.filename}</td>
                <td className="p-2 border">{(file.filesize).toFixed(2)} KB</td>
                <td className="p-2 border">
                  {file.status === 'new' && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      New
                    </span>
                  )}
                  {file.status === 'processing' && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      Processing
                      <div className="animate-spin h-5 w-5 text-yellow-500 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="h-full w-full"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  )}
                  {file.status === 'completed' && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Completed
                    </span>
                  )}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleImportFile(file.filename)}
                    className="bg-sky-700 hover:bg-sky-900 text-white px-2 py-1 rounded"
                    disabled={loadingFile === file.filename || file.status === 'Completed'}
                  >
                    {loadingFile === file.filename ? 'Importing...' : 'Import'}
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleRemoveFile(file.filename)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Delete
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handlePreviewFile(file)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nút phân trang */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Prev
          </button>
          <span className="px-4 py-2 mx-2">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastFile >= files.length}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Import;

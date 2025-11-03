import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUploadShopTransactionMutation } from "../../store/api/transactionApi";
import DashboardLayout from "../../components/layout/dashboard.layout";

const UploadTransactionPage = () => {
  const { id: shopId } = useParams(); // <-- get shopId from URL
  const [file, setFile] = useState(null);

  const [uploadShopTransaction, { isLoading }] =
    useUploadShopTransactionMutation();

  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "text/csv": [".csv"] },
  });

  const handleRemoveFile = () => setFile(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    if (!shopId) return alert("Missing shop ID in route.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadShopTransaction({ shopId, formData }).unwrap();
      alert("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading.");
    }
  };

  return (
    <DashboardLayout>
      <main className="max-w-3xl mx-auto py-10 px-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Upload Transaction
        </h2>

        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition
            ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-gray-600 font-medium">Drop your CSV file here...</p>
          ) : (
            <p className="text-gray-600 font-medium">
              Drag and drop your CSV file here, or{" "}
              <span className="text-blue-600 underline">click to upload</span>.
            </p>
          )}
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-6 flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold flex items-center justify-center transition ${
            !file || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Uploading...
            </>
          ) : (
            "Upload File"
          )}
        </button>
      </main>
    </DashboardLayout>
  );
};

export default UploadTransactionPage;

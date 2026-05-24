import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file first");
    return;
  }

  try {

    // Convert file to base64
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {

      const base64File = reader.result.split(",")[1];

      const response = await fetch(
        "http://127.0.0.1:3000/upload",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fileName: file.name,
            fileContent: base64File,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert(data.message);
    };

  } catch (error) {

    console.error(error);

    alert("Upload failed");
  }
};

  return (
    <div>
      <h1>Serverless Invoice Scanner</h1>

      <p>Upload your invoice PDF or image</p>

      <input type="file" onChange={handleFileChange} />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Invoice
      </button>

      <br />
      <br />

      {file && (
        <div>
          <h3>Selected File:</h3>

          <p>Name: {file.name}</p>
          <p>Type: {file.type}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}

export default App;
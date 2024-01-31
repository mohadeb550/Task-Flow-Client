


import { useDropzone } from 'react-dropzone';

const DropInput = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Specify the accepted file types (e.g., images)
  });


  const dropzoneStyle = {
    border: `2px dashed ${isDragActive ? 'green' : 'gray'}`,
    borderRadius: '4px',
    padding: '20px',
    margin: '15px 0',
    textAlign: 'center',
    transition: 'border 0.3s ease',
  };


  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};


export default DropInput;

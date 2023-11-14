'use client'
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [images, setImages]=useState([]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setImages([reader.result,...images])
    };

    if (file) {
      reader.readAsDataURL(file);
    }
 
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {images.map((el)=>{
        return (
          <img src={el} alt="Uploaded" style={{ maxWidth: '600px' }} />
        )
      })
    }
     
    </div>
  );
};

export default ImageUpload;
import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Img from "./component/Img";
import { cat } from "@cloudinary/url-gen/qualifiers/focusOn";
import { keyframeInterval } from "@cloudinary/url-gen/actions/transcode";

function App() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImg, setUploadedImg] = useState("");
  const [getImage, setGetImage] = useState([]);


  const previewFiles = (file) => {
    const reader = new FileReader(); // read the file or image
    // convert the file into a url to pass it to the cloudinary
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // provide and set the image after it has completely loaded onto the application.
      setImage(reader.result);
    };
    console.log(image);
  };

  // post to the database.

  const handleChange = (e) => {
    const imageUploaded = e.target.files[0];
    console.log(imageUploaded);
    setFile(imageUploaded);

    previewFiles(imageUploaded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saveImg = await axios
        .post("http://localhost:3001/upload", {
          image: image,
        })
        .catch((error) => console.log(error));
        console.log('uui',saveImg.data.data)

      try {
        const uploadedImg = saveImg.data.data.public_id;
        console.log("id", uploadedImg);
        setUploadedImg(uploadedImg);
    findImage();

      } catch (error) {
        console.log(error);
      }
      console.log(saveImg);
    } catch (error) {
      console.log(error);
    }

  };

  // get the image from the database.
  const findImage = async () => {
    try{
    const getData = await axios
      .get("http://localhost:3001/image")
      .catch((error) => console.log(error));
    console.log('imagedata', getData.data.data);
    setGetImage(getData.data.data);
    } catch(error) {
      console.log('2',error)
    }
  }


  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="fileInput"> Upload your photo here.</label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => handleChange(e)}
          required
          accept="image/png, image/jpeg, image/jpg, image/jfif"
        />

        <button> Submit </button>
      </form>
      <img src={image} alt="uploaded image should appear here." />
      {/* //prop drill to pass image to another component for transformations. */}
      <Img uploadedImg={uploadedImg} />

      <p>image from database section </p>
      {getImage.map((images, i) => (
        <img  key={getImage.id} src={images.imgUrl} alt="image from database." />
      ))}
    </>
  );
}

export default App;

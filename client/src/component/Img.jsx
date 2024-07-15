
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen"

import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize"
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners"
import {sepia} from '@cloudinary/url-gen/actions/effect'
import {source} from '@cloudinary/url-gen/actions/overlay'
import { opacity, brightness} from '@cloudinary/url-gen/actions/adjust'
import { byAngle } from '@cloudinary/url-gen/actions/rotate'

// import required qualifiers
import {image} from "@cloudinary/url-gen/qualifiers/source"
import {Position} from '@cloudinary/url-gen/qualifiers/position'
import { compass} from '@cloudinary/url-gen/qualifiers/gravity'
import {focusOn} from '@cloudinary/url-gen/qualifiers/gravity'
import {FocusOn} from '@cloudinary/url-gen/qualifiers/focusOn'
import React from 'react';

const Img = ({ uploadedImg }) => {
  // configure and create a cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dri0u8iw3",
    },
  });
  // create an instance of the image
  // use the image with public id, ' front-face
  const myImage = cld.image(uploadedImg); 
  myImage
    .resize(thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
    .roundCorners(byRadius(20)); 

  return <>
  <AdvancedImage cldImg={myImage}/>
  </>;
};



export default Img;
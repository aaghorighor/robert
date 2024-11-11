import React, { useState } from "react";
import fallbackSrc from '../../assets/imgs/267-2676180_transparent-background-doctor-icon.png';

const ImageWithFallback = ({ src, ...props }) => { 

  return <img {...props} src={src?.length ? src : fallbackSrc} />;
};

export default ImageWithFallback;

import React from "react";
import ImageViewing from "react-native-image-viewing";

const ImageViewer = ({ images, visible, onClose, initialIndex = 0 }) => {
  return (
    <ImageViewing
      animationType="slide"
      images={images.map((uri) => uri)} // Doğru formatta URI gönderiyoruz
      visible={visible}
      key={initialIndex}
      imageIndex={initialIndex}
      onRequestClose={onClose}
    />
  );
};

export default ImageViewer;

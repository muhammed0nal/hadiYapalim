import { Image } from "react-native";
import React from "react";
import { useUserImage } from "../../contexts/profilePhotoUrl";

export default function ActiveUserImage({ style }) {
  const { profilePhotoUrl } = useUserImage();

  return (
    <Image
      key={profilePhotoUrl}
      onError={(error) => console.log(error.nativeEvent)}
      source={{
        uri: profilePhotoUrl,
      }}
      style={style}
    />
  );
}

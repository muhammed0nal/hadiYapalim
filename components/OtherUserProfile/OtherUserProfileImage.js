import { Image } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useCallback, useState } from "react";
import { ip } from "../../ip/ip";

export default function OtherUserProfileImage({
  profilePhotoUrl,
  style,
  user_id,
}) {
  const { authState } = useAuth();
  const [imageCache, setImageCache] = useState({});
  const fetchImage = useCallback(
    async (userId, imagePath) => {
      const imageKey = `${userId}${imagePath}`;

      if (imageCache[imageKey]) {
        return imageCache[imageKey];
      }

      try {
        const response = await fetch(`${ip}/images/${userId}${imagePath}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result;
              setImageCache((prev) => ({ ...prev, [imageKey]: base64data }));
              resolve(base64data);
            };
            reader.readAsDataURL(blob);
          });
        }
      } catch (error) {
        console.error("Resim yüklenirken hata:", error);
        return null;
      }
    },
    [authState?.token]
  );

  return (
    <Image
      key={profilePhotoUrl}
      onError={(error) => console.log(error.nativeEvent)}
      source={{
        uri: imageCache[`${user_id}/profile_photo_user_${user_id}.jpg`] || null,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }}
      style={style}
      onLayout={() => {
        if (!imageCache[`${user_id}/profile_photo_user_${user_id}.jpg`]) {
          fetchImage(user_id, `/profile_photo_user_${user_id}.jpg`);
        }
      }}
    />
  );
}

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ip } from "../ip/ip";
import { useAuth } from "./AuthContext";
const ProfilePhotoContext = createContext();

export const ProfilePhotoProvider = ({ children }) => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();
  const { authState } = useAuth();

  useEffect(() => {
    if (!authState?.token || !authState?.userId) return;

    const fetchProfilePhoto = async () => {
      try {
        const imageUrl = `${ip}/images/${authState.userId}/profile_photo_user_${
          authState.userId
        }.jpg?${new Date().getTime()}`;
        console.log("imageUrl", imageUrl);
        // Standart fetch API kullanımı
        const response = await fetch(imageUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        console.log("response", response.url);

        if (response.ok) {
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = () => {
            const base64data = reader.result;
            setProfilePhotoUrl(base64data);
          };
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        setProfilePhotoUrl(null);
        console.error("Profil fotoğrafı yüklenirken hata:", error);
      }
    };

    fetchProfilePhoto();
  }, [
    authState?.token,
    authState?.userId,
    profilePhotoUrl,
    setProfilePhotoUrl,
  ]);

  return (
    <ProfilePhotoContext.Provider
      value={{ profilePhotoUrl, setProfilePhotoUrl }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useUserImage = () => useContext(ProfilePhotoContext);

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ip } from "../ip/ip";
import { useAuth } from "./AuthContext";

const ProfilePhotoContext = createContext();

export const ProfilePhotoProvider = ({ children }) => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();
  const { authState } = useAuth();
  console.log("contexts");
  console.log(profilePhotoUrl);
  useEffect(() => {
    if (!authState.token) return;
    const fetchProfilePhoto = async () => {
      try {
        if (authState.token) {
          const response = await axios.get(`${ip}/profile/profilePhoto`);
          setProfilePhotoUrl(response.data.profilePhotoUrl);
        }
      } catch (error) {
        console.log("Profile Photo Error:", error);
      }
    };

    fetchProfilePhoto();
  }, [authState.token]);

  return (
    <ProfilePhotoContext.Provider
      value={{ profilePhotoUrl, setProfilePhotoUrl }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useUserImage = () => useContext(ProfilePhotoContext);

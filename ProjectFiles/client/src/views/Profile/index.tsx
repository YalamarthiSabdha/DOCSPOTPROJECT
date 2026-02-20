// React Imports
import { useState, useEffect } from "react";
// Hooks
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux
import { selectedUserId, userIsDoctor } from "../../redux/auth/authSlice";
// Custom Imports
import UserProfile from "./components/userProfile";
import DoctorProfile from "./components/doctorProfile";

const Profile = () => {
  const isDoctor = useTypedSelector(userIsDoctor);

  return (
    <>
      {isDoctor ? (
        <DoctorProfile />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;

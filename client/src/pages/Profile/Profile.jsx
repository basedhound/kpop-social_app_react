import React from "react";
import "./Profile.css";
import PostSide from "./../../components/PostSide/PostSide";
import RightSide from "./../../components/RightSide/RightSide";
import ProfileLeft from "./../../components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../components/ProfileSide/ProfileCard/ProfileCard";

const Profile = () => {
   return (
      <section className="Profile">
         <ProfileLeft />

         <section className="ProfileCenter">
            <ProfileCard location = "ProfilePage" />
            <PostSide />
         </section>

         <RightSide />
      </section>
   );
};

export default Profile;

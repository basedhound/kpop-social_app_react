import React from "react";
import FollowersCard from "../ProfileSide/FollowersCard/FollowersCard";
import LogoSearch from "../ProfileSide/LogoSearch/LogoSearch";
import InfoCard from "./InfoCard/InfoCard";

const ProfileLeft = () => {
   return (
      <section className="ProfileSide">
         <LogoSearch />
         <InfoCard />
         <FollowersCard />
      </section>
   );
};

export default ProfileLeft;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../actions/userAction";

const User = ({ person }) => {
   //? Dependencies
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.authReducer.authData);
   const [following, setFollowing] = useState(
      person.followers.includes(user._id)
   );

   //? Access Public folder to use images
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

   //? Follow function
   const handleFollow = () => {
      following
         ? dispatch(unfollowUser(person._id, user))
         : dispatch(followUser(person._id, user));
      setFollowing((prev) => !prev);
   };

   return (
      <div className="Follower">
         <div>
            <img
               src={
                  person.profilePicture
                     ? serverPublic + person.profilePicture
                     : serverPublic + "defaultProfile.png"
               }
               alt=""
               className="FollowerImg"
            />
            <div className="FollowerName">
               <span>{person.firstname}</span>
               <span>@{person.firstname + person.lastname}</span>
            </div>
         </div>
         <button className={following? "Button Btn--Follow Btn--Unfollow" : "Button Btn--Follow"  } onClick={handleFollow}>
            {following ? "Unfollow" : "Follow"}
         </button>
      </div>
   );
};

export default User;

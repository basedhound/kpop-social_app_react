import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
   //? Rendering test
   // const ProfilePage = false;
   //? Server Public Folder
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
   //? User context
   const { user } = useSelector((state) => state.authReducer.authData);
   //? Posts context
   const posts = useSelector((state) => state.postReducer.posts);

   return (
      <div className="ProfileCard">
         <div className="ProfileImages">
            <img
               src={
                  user.coverPicture
                     ? serverPublic + user.coverPicture
                     : serverPublic + "defaultCover.jpg"
               }
               alt=""
            />
            <img
               src={
                  user.profilePicture
                     ? serverPublic + user.profilePicture
                     : serverPublic + "defaultProfile.png"
               }
               alt=""
            />
         </div>

         <div className="ProfileName">
            <h2>
               {user.firstname} {user.lastname}
            </h2>
            <p>{user.worksAt ? user.worksAt : "Write about yourself"}</p>
         </div>

         <div className="FollowStatus">
            <div>
               <div className="Follow">
                  <span>{user.following.length}</span>
                  <span>Followings</span>
               </div>
               <div className="vertical-line"></div>
               <div className="Follow">
                  <span>{user.followers.length}</span>
                  <span>Followers</span>
               </div>
               {location === "ProfilePage" && (
                  <>
                     <div className="vertical-line"></div>
                     <div className="Follow">
                        <span>
                           {posts.filter((post) => post.userId === user._id).length}
                        </span>
                        <span>Posts</span>
                     </div>
                  </>
               )}
            </div>
         </div>
         {location === "ProfilePage" ? (
            ""
         ) : (
            <span>
               <Link to={`/profile/${user._id}`}>My Profile</Link>
            </span>
         )}
      </div>
   );
};

export default ProfileCard;

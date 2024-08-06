import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector  } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/userRequest.js";
import { logOut } from './../../../actions/authAction';

const InfoCard = () => {
   //? Modal window for user update
   const [modalOpened, setModalOpened] = useState();

   //? User fetch
   const dispatch = useDispatch();
   const params = useParams();
   const profileUserId = params.id;
   // console.log(profileUserId)
   const [profileUser, setProfileUser] = useState({});
   const { user } = useSelector((state) => state.authReducer.authData);

   useEffect(() => {
      const fetchProfileUser = async () => {
         if (profileUserId === user._id) {
            setProfileUser(user);
            console.log("User :", user )
         } else {
            console.log("fetching")
            const profileUser = await UserApi.getUser(profileUserId);
            setProfileUser("profileUser :", profileUser);
            console.log(profileUser)
         }
      };
      fetchProfileUser();
   }, [user]);

//? Logout
const handleLogout = () => {
   dispatch(logOut())
}

   return (
      <section className="InfoCard">
         <div className="InfoHead">
            <h2>Profile Info</h2>
            {user._id === profileUserId ? (
               <div>
                  <UilPen
                     width="2rem"
                     height="1.2rem"
                     onClick={() => setModalOpened(true)}
                  />
                  <ProfileModal
                     modalOpened={modalOpened}
                     setModalOpened={setModalOpened}
                     data = {user}
                  />
               </div>
            ) : (
               ""
            )}
         </div>

         <div className="Info">
            <span>
               <b>Status : </b>
            </span>
            <span>{profileUser.relationship}</span>
         </div>

         <div className="Info">
            <span>
               <b>Lives in </b>
            </span>
            <span>{profileUser.livesin}</span>
         </div>

         <div className="Info">
            <span>
               <b>Works at </b>
            </span>
            <span>{profileUser.worksAt}</span>
         </div>

         <button className="Button Btn--Logout" onClick={handleLogout}>Logout</button>
      </section>
   );
};

export default InfoCard;

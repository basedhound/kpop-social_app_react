import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateUser } from './../../../actions/userAction';
import { uploadImage } from "../../../actions/uploadAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
   const theme = useMantineTheme();

   //? User infos
   const dispatch = useDispatch();
   const params = useParams();
   const { password, ...other } = data;
   const [formData, setFormData] = useState(other);
   const { user } = useSelector((state) => state.authReducer.authData);
   
   //? Update infos
   const handleInfos = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   
   //? Update Pictures
   const [profileImage, setProfileImage] = useState(null);
   const [coverImage, setCoverImage] = useState(null);
   const handleImages = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         event.target.name === "profileImage"
            ? setProfileImage(img)
            : setCoverImage(img);
      }
   };

   //? Submit : Update Confirmation
   const handleSubmit = (e) => {
      e.preventDefault();
      let UserData = formData;
      if (profileImage) {
         const data = new FormData();
         const fileName = Date.now() + profileImage.name;
         data.append("name", fileName);
         data.append("file", profileImage);
         UserData.profilePicture = fileName;
         try {
            dispatch(uploadImage(data));
         } catch (error) {
            console.log(error);
         }
      }
      if (coverImage) {
         const data = new FormData();
         const fileName = Date.now() + coverImage.name;
         data.append("name", fileName);
         data.append("file", coverImage);
         UserData.coverPicture = fileName;
         try {
            dispatch(uploadImage(data));
         } catch (error) {
            console.log(error);
         }
      }
      dispatch(updateUser(params.id, UserData))
      setModalOpened(false)
   };

   return (
      <Modal
         overlayColor={
            theme.colorScheme === "dark"
               ? theme.colors.dark[9]
               : theme.colors.gray[2]
         }
         overlayOpacity={0.55}
         overlayBlur={3}
         size="55%"
         opened={modalOpened}
         onClose={() => setModalOpened(false)}>

         <form action="" className="UserInfosForm">
            <h2>Your Info</h2>

            <div>
               <input
                  value={formData.firstname}
                  onChange={handleInfos}
                  type="text"
                  className="UserInfoInput"
                  placeholder="First Name"
                  name="firstname"
               />
               <input
                  value={formData.lastname}
                  onChange={handleInfos}
                  type="text"
                  className="UserInfoInput"
                  placeholder="Last Name"
                  name="lastname"
               />
            </div>
            <div>
               <input
                  value={formData.worksAt}
                  onChange={handleInfos}
                  type="text"
                  className="UserInfoInput"
                  placeholder="Works at"
                  name="worksAt"
               />
            </div>
            <div>
               <input
                  value={formData.livesin}
                  onChange={handleInfos}
                  type="text"
                  className="UserInfoInput"
                  placeholder="Lives in"
                  name="livesin"
               />
               <input
                  type="text"
                  className="UserInfoInput"
                  placeholder="Country"
                  name="country"
                  onChange={handleInfos}
                  value={formData.country}
               />
            </div>

            <div>
               <input
               value={formData.relationship}
               onChange={handleInfos}
               type="text"
               className="UserInfoInput"
               placeholder="Relationship Status"
               name="relationship"
               />
            </div>

            <div>
               Profile Image
               <input
                  type="file"
                  className="UserInfoInput"
                  name="profileImage"
                  onChange={handleImages}
               />
               Cover Image
               <input
                  type="file"
                  className="UserInfoInput"
                  name="coverImage"
                  onChange={handleImages}
               />
            </div>

            <button className="Button Btn--UserInfo" type="submit" onClick={handleSubmit}>
               Update
            </button>
         </form>
      </Modal>
   );
}

export default ProfileModal;

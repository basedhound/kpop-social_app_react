import React, { useState, useRef } from "react";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "./../../../actions/uploadAction";

const PostShare = () => {
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
   const loading = useSelector((state) => state.postReducer.uploading);
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.authReducer.authData);
   const [image, setImage] = useState(null);
   const imageRef = useRef();
   const desc = useRef();

   //? handle Image Change
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setImage(img);
      }
   };

   //? Reset fields after submit
   const reset = () => {
      setImage(null);
      desc.current.value = "";
   };


   //? Submit post
   // handle post upload
   const handleUpload = (e) => {
      // e.preventDefault();

      //post data
      const newPost = {
         userId: user._id,
         desc: desc.current.value,
      };

      // if there is an image with post
      if (image) {
         const data = new FormData();
         const fileName = Date.now() + image.name;
         data.append("name", fileName);
         data.append("file", image);
         newPost.image = fileName;
         console.log(newPost);
         try {
            dispatch(uploadImage(data));
         } catch (error) {
            console.log(error);
         }
      }
      dispatch(uploadPost(newPost));
      reset()
   };

   return (
      <section className="PostShare">
         <img                src={
                  user.profilePicture
                     ? serverPublic + user.profilePicture
                     : serverPublic + "defaultProfile.png"
               } alt="" />
         <div>
            <input
               ref={desc}
               required
               type="text"
               placeholder="What's on your mind ?"
            />
            <div className="PostOptions">
               <div
                  className="PostOption"
                  style={{ color: "var(--photo)" }}
                  onClick={() => imageRef.current.click()}>
                  <UilScenery />
                  &nbsp;Photo
               </div>
               <div className="PostOption" style={{ color: "var(--video)" }}>
                  <UilPlayCircle />
                  &nbsp;Video
               </div>
               <div className="PostOption" style={{ color: "var(--location)" }}>
                  <UilLocationPoint />
                  &nbsp;Location
               </div>
               <div className="PostOption" style={{ color: "var(--schedule)" }}>
                  <UilSchedule />
                  &nbsp;Schedule
               </div>
               <button
                  className="Button Btn--Share"
                  onClick={handleUpload}
                  disabled={loading}>
                  {loading ? "Uplading..." : "Share"}
               </button>
               <div style={{ display: "none" }}>
                  <input
                     type="file"
                     name="myImage"
                     ref={imageRef}
                     onChange={onImageChange}
                  />
               </div>
            </div>
            {image && (
               <div className="PreviewImage">
                  <UilTimes onClick={() => setImage(null)} />
                  <img src={URL.createObjectURL(image)} alt="" />
               </div>
            )}
         </div>
      </section>
   );
};

export default PostShare;

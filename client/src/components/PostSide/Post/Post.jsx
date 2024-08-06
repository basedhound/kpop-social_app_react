import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Post.css";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/like.png";
import NotLike from "../../../img/notlike.png";
import { likePost } from "../../../api/postRequest";

const Post = ({ data }) => {
   //? Dependencies
   const { user } = useSelector((state) => state.authReducer.authData);

   //? Likes
   const [liked, setLiked] = useState(data.likes.includes(user._id));
   const [likes, setLikes] = useState(data.likes.length);
   const handleLike = () => {
      likePost(data._id, user._id);
      setLiked((prev) => !prev);
      liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
    };

   return (
      
      <div className="Post">
         <img
            src={
               data.image
                  ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                  : ""
            }
            alt=""
         />

         <div className="PostReactions">
            <img
               src={liked ? Heart : NotLike}
               alt=""
               className="PostIcon"
               onClick={handleLike}
            />
            <img src={Comment} alt="" className="PostIcon" />
            <img src={Share} alt="" className="PostIcon" />
         </div>

         <span>{likes} likes</span>

         <div className="PostDetails">
            <span>
               <b> Username - </b>
            </span>
            <span>{data.desc}</span>
         </div>
      </div>
   );
};

export default Post;

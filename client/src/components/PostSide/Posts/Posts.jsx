import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../../actions/postAction.js";
import Post from "../Post/Post";
import "./Posts.css";

// Pass the data to " Post " component

const Posts = () => {
   //? Dependencies
   const params = useParams();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.authReducer.authData);
   let { posts, loading } = useSelector((state) => state.postReducer);

   //? Timeline Posts
   useEffect(() => {
      dispatch(getTimelinePosts(user._id));
      console.log(posts);
   }, []);

   if (!posts) return "No Posts";
   if (params.id) posts = posts.filter((post) => post.userId === params.id);

   return (
      <section className="Posts">
         {loading
            ? "Fetching Posts..."
            : posts.map((post, id) => {
                 return <Post data={post} key={id} />;
              })}
      </section>
   );
};

export default Posts;

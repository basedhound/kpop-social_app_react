import mongoose from "mongoose";
import PostModel from "../models/post_model.js";
import UserModel from "../models/user_model.js";

//? Creat a new Post
export const createPost = async (req, res) => {
   const newPost = new PostModel(req.body);

   try {
      await newPost.save();
      res.status(200).json(newPost);
   } catch (error) {
      res.status(500).json({error: error.message});
   }
};

//? Get a post
export const getPost = async (req, res) => {
   const id = req.params.id;
   try {
      const post = await PostModel.findById(id);
      res.status(200).json(post);
   } catch (error) {
      res.status(500).json(error);
   }
};

//? Update a post
export const updatePost = async (req, res) => {
   const postId = req.params.id;
   const { userId } = req.body;

   try {
      const post = await PostModel.findById(postId);
      if (post.userId === userId) {
         await post.updateOne({ $set: req.body });
         res.status(200).json("Post updated !");
      } else {
         res.status(403).json("You can only update your own posts !");
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

//? Delete a post
export const deletePost = async (req, res) => {
   const id = req.params.id;
   const { userId } = req.body;

   try {
      const post = await PostModel.findById(id);
      if (post.userId === userId) {
         await post.deleteOne();
         res.status(200).json("Post deleted !");
      } else {
         res.status(403).json("You can only delete your own posts !");
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

//? Like / Dislike a post
export const likePost = async (req, res) => {
   const id = req.params.id;
   const { userId } = req.body;
   try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
         await post.updateOne({ $push: { likes: userId } });
         res.status(200).json("Post liked !");
      } else {
         await post.updateOne({ $pull: { likes: userId } });
         res.status(200).json("Post disliked !");
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

//? Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
   const userId = req.params.id;

   try {
      const currentUserPosts = await PostModel.find({ userId: userId });

      const followingPosts = await UserModel.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(userId),
            },
         },
         {
            $lookup: {
               from: "posts",
               localField: "following",
               foreignField: "userId",
               as: "followingPosts",
            },
         },
         {
            $project: {
               followingPosts: 1,
               _id: 0,
            },
         },
      ]);
      res.status(200).json(
         currentUserPosts
            .concat(...followingPosts[0].followingPosts)
            .sort((a, b) => {
               return new Date(b.createdAt) - new Date(a.createdAt);
            })
      );
   } catch (error) {
      res.status(500).json(error);
   }
};

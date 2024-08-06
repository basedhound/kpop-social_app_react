import * as uploadRequest from "../api/uploadRequest";

export const uploadImage = (data) => async (dispatch) => {
   try {
      await uploadRequest.uploadImage(data);
   } catch (error) {
      console.log(error);
   }
};

export const uploadPost = (data) => async (dispatch) => {
   dispatch({ type: "UPLOAD_START" });
   try {
      const newPost = await uploadRequest.uploadPost(data);
      dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
   } catch (error) {
      dispatch({ type: "UPLOAD_FAIL" });
      console.log(error);
   }
};

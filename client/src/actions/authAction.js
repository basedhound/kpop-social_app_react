import * as AuthApi from "../api/authRequest.js";

// "formData" is a parameter recieved from Auth.jsx component
export const logIn = (formData) => async (dispatch) => {
   // Tell reducer that authentication started
   dispatch({ type: "AUTH_START" });
   try {
      const { data } = await AuthApi.logIn(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
   } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_FAIL" });
   }
};
export const signUp = (formData) => async (dispatch) => {
   // Tell reducer that authentication started
   dispatch({ type: "AUTH_START" });
   try {
      const { data } = await AuthApi.signUp(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
   } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_FAIL" });
   }
};

export const logOut = () => async(dispatch) => {
   dispatch({type: "LOG_OUT"})
}
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IOrganisationRegister } from "types/user.types";

const initialState: IOrganisationRegister = {
  email: "",
  firstName: "",
  lastName: "",
  orgName: "",
  password: "",
  username: "",
  confirmPassword:"",
};
/**
 * username,firstName,lastName,organization name, organization email,
 * orgName, email, username,firstName,lastName,password
 */
export const loginForm = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setLoginForm: (state, action: PayloadAction<IOrganisationRegister>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.orgName = action.payload.orgName;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.username = action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginForm } = loginForm.actions;

export default loginForm.reducer;

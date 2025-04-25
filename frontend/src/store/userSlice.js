import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Appel API login : thunk asynchrone
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.body.token;
        localStorage.setItem("token", token);
        return { token };
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    userInfo: null,
    isLoggedIn: !!localStorage.getItem("token"),
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.userInfo = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;

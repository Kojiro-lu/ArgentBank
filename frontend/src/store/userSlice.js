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
        // Sauvegarder le token dans le localStorage
        localStorage.setItem("token", token);
        return { token }; // retourner le token
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
    token: localStorage.getItem("token") || null, // Charger le token du localStorage
    userInfo: null,
    isLoggedIn: !!localStorage.getItem("token"), // Vérifier si un token est présent
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      // Supprimer le token du localStorage lors de la déconnexion
      localStorage.removeItem("token");
      state.token = null;
      state.userInfo = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token; // Stocke le token dans le state
        state.isLoggedIn = true; // L'utilisateur est connecté
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;

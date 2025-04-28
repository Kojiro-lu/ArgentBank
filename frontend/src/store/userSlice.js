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

      if (!response.ok) {
        let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";

        if (data.message?.includes("Password is invalid")) {
          errorMessage = "Mot de passe incorrect. Veuillez réessayer.";
        } else if (data.message?.includes("User not found")) {
          errorMessage = "Adresse e-mail inconnue. Vérifiez votre saisie.";
        }

        return thunkAPI.rejectWithValue(errorMessage);
      }

      const token = data.body.token;
      localStorage.setItem("token", token);
      return { token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Erreur réseau. Vérifiez votre connexion."
      );
    }
  }
);

// Thunk pour récupérer le profil de l'utilisateur (firstName, lastName, userName)
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Token manquant.");
      }

      const apiUrl = "http://localhost:3001/api/v1/user/profile";

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message ||
            "Erreur lors de la récupération du profil utilisateur."
        );
      }

      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau.");
    }
  }
);

// Thunk pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT", // Utilisation de PUT pour la mise à jour
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête
          },
          body: JSON.stringify(userData), // Envoi des données à mettre à jour
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Erreur lors de la mise à jour du profil."
        );
      }

      // Retourner les nouvelles données utilisateur après mise à jour
      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau.");
    }
  }
);

// Thunk pour mettre à jour le nom d'utilisateur
export const updateUserUsername = createAsyncThunk(
  "user/updateUserUsername",
  async (newUsername, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      // Log du token et du corps de la requête
      console.log("Token envoyé :", token);
      console.log("Body envoyé :", { userName: newUsername });

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile", // URL à adapter si nécessaire
        {
          method: "PUT", // Méthode PUT pour la mise à jour
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: newUsername }),
        }
      );

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Erreur lors de la mise à jour du nom d'utilisateur."
        );
      }

      // Retourner les nouvelles données utilisateur après mise à jour
      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau.");
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
        state.error = action.payload || "Une erreur est survenue";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Gestion de la mise à jour du profil utilisateur
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload; // Mettre à jour userInfo avec les nouvelles données
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Mise à jour du nom d'utilisateur
      .addCase(updateUserUsername.fulfilled, (state, action) => {
        state.userInfo.username = action.payload.username; // Mettre à jour le username dans userInfo
      })
      .addCase(updateUserUsername.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;

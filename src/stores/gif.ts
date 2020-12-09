import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import gifApi from "../api/gif";

const initialState = {
  url: "",
  loading: false,
  error: false
};

export const fetchAsync = createAsyncThunk(
  'fetchGif',
  async () => {
    const result = await gifApi.random();
    return result.url;
  }
);


const slice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    reset(state) {
      state.url = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsync.fulfilled, (state, action) => {
      return { ...state, loading: false, url: action.payload };
    }),
      builder.addCase(fetchAsync.pending, (state, action) => {
        return { ...state, loading: true };
    })
  }
});

export const {
  reset
} = slice.actions

// Reducer
export default slice.reducer;

import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
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

// Reducer
export default slice.reducer;

export const {
  reset
} = slice.actions
// Async task

export const gifSelector = (state: { gif: typeof initialState }) =>
  state.gif
// export function fetchAsync() {
//   return async function(dispatch) {
//     dispatch(slice.actions.fetchStart());

//     try {
//       const response = await gifApi.random();
//       dispatch(slice.actions.fetchSucceed(response.url));
//     } catch (err) {
//       dispatch(slice.actions.fetchFaild(err));
//     }
//   };
// }

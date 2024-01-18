import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commonService } from "../../services/common.services";
import { apiConstants } from "../../constants/api.constant";
import { toast } from "react-toastify";


export const getMovieList = createAsyncThunk('movie/getMovies', async (data) => {
  const response = await commonService.withToken(apiConstants.GET_MOVIE_LIST ,data); 
  return response.data; 
});

export const addMovie = createAsyncThunk('movie/addMovie', async (data) => {
  const response = await commonService.withTokenFormData(apiConstants.CREATE_MOVIE ,data);
  if(response && response.data && response.data.status){
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Adjust the autoClose time if needed
    });
  }else{
    toast.error(
      response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      }
    )
  }
 
  return response.data; 
});

export const deleteMovie = createAsyncThunk('movie/deleteMovie', async (data) => {
  const response = await commonService.deleteWithToken(apiConstants.DELETE_MOVIE ,data);
  if(response && response.data && response.data.status){
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Adjust the autoClose time if needed
    });
  }else{
    toast.error(
      response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      }
    )
  }
 
  return response.data; 
});

// Update movie by id
export const updateMovie = createAsyncThunk('movie/updateMovie', async (data) => {
  const response = await commonService.putWithToken(apiConstants.UPDATE_MOVIE ,data); 
  if(response && response.data && response.data.status){
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Adjust the autoClose time if needed
    });
  }else{
    toast.error(
      response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      }
    )
  }
 
  return response.data; 
});

// Get movie by id
export const getMovieById = createAsyncThunk('movie/getMovieById', async (data) => {
  const response = await commonService.getDataWithToken(apiConstants.GET_MOVIE_BY_ID ,data); 
  return response.data; 
});


const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    loading: false,
    error: null,
    movieList: null,
    movieData: null,
    getMovieData: null,
    deleteMovie: null
  },
  reducers: {
    changeValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieList.fulfilled, (state, action) => {
        state.loading = false;
        state.movieList = action.payload;
      })
      .addCase(getMovieList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.getMovieData = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteMovie = action.payload;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export const { changeValue } = movieSlice.actions;

export default movieSlice.reducer 
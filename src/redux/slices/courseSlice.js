import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  // Map products to a "course" like structure
  return data.products.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    image: item.thumbnail,
    rating: item.rating,
    category: item.category
  }));
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    favourites: [], // Array of course IDs
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const courseId = action.payload;
      if (state.favourites.includes(courseId)) {
        state.favourites = state.favourites.filter(id => id !== courseId);
      } else {
        state.favourites.push(courseId);
      }
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavourite, setFavourites } = courseSlice.actions;
export default courseSlice.reducer;

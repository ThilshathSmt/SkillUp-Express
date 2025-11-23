import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  // Fetching "programming" books to simulate computer science courses
  const response = await fetch('https://openlibrary.org/subjects/programming.json?limit=20');
  const data = await response.json();
  
  // Map Open Library "works" to our app's "course" structure
  return data.works.map(work => ({
    id: work.key, // Unique key from Open Library
    title: work.title,
    description: work.first_sentence ? work.first_sentence.value : 'No description available for this resource.',
    price: (Math.random() * 100).toFixed(2), // Mock price for the assignment
    image: work.cover_id 
      ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` 
      : 'https://via.placeholder.com/300x400.png?text=No+Cover',
    rating: (3 + Math.random() * 2).toFixed(1), // Mock rating
    category: 'Computer Science',
    authors: work.authors ? work.authors.map(a => a.name).join(', ') : 'Unknown Author'
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

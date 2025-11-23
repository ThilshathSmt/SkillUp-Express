import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  // Default fetch: "programming" books
  const response = await fetch('https://openlibrary.org/subjects/programming.json?limit=20');
  const data = await response.json();
  
  return data.works.map(work => ({
    id: work.key,
    title: work.title,
    description: work.first_sentence ? work.first_sentence.value : 'No description available for this resource.',
    price: (Math.random() * 100).toFixed(2),
    image: work.cover_id 
      ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` 
      : 'https://via.placeholder.com/300x400.png?text=No+Cover',
    rating: (3 + Math.random() * 2).toFixed(1),
    category: 'Computer Science',
    authors: work.authors ? work.authors.map(a => a.name).join(', ') : 'Unknown Author'
  }));
});

export const searchCourses = createAsyncThunk('courses/searchCourses', async (query) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
  const data = await response.json();

  return data.docs.map(doc => ({
    id: doc.key,
    title: doc.title,
    description: doc.first_sentence ? doc.first_sentence[0] : 'No description available.',
    price: (Math.random() * 100).toFixed(2),
    image: doc.cover_i 
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` 
      : 'https://via.placeholder.com/300x400.png?text=No+Cover',
    rating: (doc.ratings_average || (3 + Math.random() * 2)).toFixed(1),
    category: 'Search Result',
    authors: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author'
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
      })
      .addCase(searchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavourite, setFavourites } = courseSlice.actions;
export default courseSlice.reducer;

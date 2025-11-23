import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/redux/store';
import { setFavourites } from './src/redux/slices/courseSlice';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

// Component to handle persistence logic
const PersistenceManager = ({ children }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.courses.favourites);

  // Load favourites on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFavs = await AsyncStorage.getItem('favourites');
        if (savedFavs) {
          dispatch(setFavourites(JSON.parse(savedFavs)));
        }
      } catch (e) {
        console.error('Failed to load favourites', e);
      }
    };
    loadData();
  }, [dispatch]);

  // Save favourites when they change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
      } catch (e) {
        console.error('Failed to save favourites', e);
      }
    };
    saveData();
  }, [favourites]);

  return children;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistenceManager>
        <AppNavigator />
        <StatusBar style="auto" />
      </PersistenceManager>
    </Provider>
  );
}

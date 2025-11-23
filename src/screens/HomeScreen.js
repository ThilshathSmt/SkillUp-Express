import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, toggleFavourite } from '../redux/slices/courseSlice';
import CourseCard from '../components/CourseCard';
import colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { courses, status, favourites } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const handlePress = (course) => {
    navigation.navigate('CourseDetails', { courseId: course.id });
  };

  const handleToggleFav = (courseId) => {
    dispatch(toggleFavourite(courseId));
  };

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'Student'}!</Text>
        <Text style={styles.subtitle}>Find your next skill to master.</Text>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => handlePress(item)}
            isFavourite={favourites.includes(item.id)}
            onToggleFav={() => handleToggleFav(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
});

export default HomeScreen;

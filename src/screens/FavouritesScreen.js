import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../redux/slices/courseSlice';
import CourseCard from '../components/CourseCard';
import colors from '../constants/colors';

const FavouritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { courses, favourites } = useSelector(state => state.courses);
  
  const favouriteCourses = courses.filter(c => favourites.includes(c.id));

  const handlePress = (course) => {
    navigation.navigate('CourseDetails', { courseId: course.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
      </View>

      {favouriteCourses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No favourites yet.</Text>
          <Text style={styles.emptySubtext}>Start exploring and save courses you like!</Text>
        </View>
      ) : (
        <FlatList
          data={favouriteCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              onPress={() => handlePress(item)}
              isFavourite={true}
              onToggleFav={() => dispatch(toggleFavourite(item.id))}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default FavouritesScreen;

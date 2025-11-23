import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../redux/slices/courseSlice';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const CourseDetailsScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  const course = useSelector(state => 
    state.courses.courses.find(c => c.id === courseId)
  );
  const isFavourite = useSelector(state => 
    state.courses.favourites.includes(courseId)
  );

  if (!course) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: course.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>{course.category.toUpperCase()}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.secondary} />
              <Text style={styles.rating}>{course.rating}</Text>
            </View>
          </View>

          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.price}>${course.price}</Text>

          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton 
          title={isFavourite ? "Remove from Favourites" : "Add to Favourites"} 
          onPress={() => dispatch(toggleFavourite(course.id))}
          type={isFavourite ? "secondary" : "primary"}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.black,
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
});

export default CourseDetailsScreen;

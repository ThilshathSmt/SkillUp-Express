# SkillUp Express - Development Plan

## 1. Project Folder Structure
```
SkillUp-Express/
├── assets/                 # Images, fonts
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CourseCard.js
│   │   ├── CustomButton.js
│   │   └── InputField.js
│   ├── constants/          # Colors, API URLs
│   │   └── colors.js
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── TabNavigator.js
│   ├── redux/              # State management
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── courseSlice.js
│   ├── screens/            # App screens
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── CourseDetailsScreen.js
│   │   └── FavouritesScreen.js
│   └── utils/              # Helper functions
│       └── storage.js      # AsyncStorage wrappers (optional)
├── App.js                  # Entry point
├── app.json                # Expo config
└── package.json            # Dependencies
```

## 2. Step-by-Step Building Plan

### Phase 1: Setup & Configuration
1.  Initialize Expo project.
2.  Install dependencies (Navigation, Redux, Icons, AsyncStorage).
3.  Create folder structure.

### Phase 2: State Management (Redux)
1.  Setup `courseSlice` for fetching data and managing favourites.
2.  Setup `authSlice` for dummy login/register logic.
3.  Configure the Redux `store`.

### Phase 3: Navigation Setup
1.  Implement `AuthNavigator` (Login, Register).
2.  Implement `TabNavigator` (Home, Favourites).
3.  Implement `AppNavigator` (Switch between Auth and Main App, plus Details screen).

### Phase 4: UI & Feature Implementation
1.  **Auth Screens**: Build Login and Register screens with basic validation.
2.  **Home Screen**: Fetch data from API, display in `FlatList` using `CourseCard`.
3.  **Course Details**: Show full details when a card is clicked.
4.  **Favourites**: Implement toggle logic and persistence using AsyncStorage.

### Phase 5: Polish & Finalize
1.  Style improvements (Colors, Spacing).
2.  Test flow.
3.  Prepare for submission.

## 3. Installation Commands
Run these in the terminal:

```bash
# 1. Initialize Project (if not already done)
npx create-expo-app@latest . --template blank

# 2. Install Navigation Dependencies
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# 3. Install Redux Toolkit & React Redux
npm install @reduxjs/toolkit react-redux

# 4. Install Icons & Storage
npm install @expo/vector-icons @react-native-async-storage/async-storage
```

## 4. Navigation Setup
- **Stack Navigator**: For moving between screens (e.g., Home -> Details).
- **Bottom Tab Navigator**: For switching main sections (Home <-> Favourites).
- **Structure**:
    - `RootStack`:
        - If not logged in: `AuthStack` (Login, Register)
        - If logged in: `MainTabs` (Home, Favourites) + `CourseDetails`

## 5. Redux Slices Planning

### `authSlice`
- **State**: `{ user: null, isAuthenticated: false }`
- **Actions**: `login(userData)`, `logout()`, `register(userData)`

### `courseSlice`
- **State**: `{ courses: [], favourites: [], status: 'idle' }`
- **Actions**: 
    - `fetchCourses` (AsyncThunk): Fetch from `https://dummyjson.com/products` (map 'products' to 'courses').
    - `toggleFavourite(courseId)`: Add/Remove from favourites list.
    - `loadFavourites()`: Load from AsyncStorage on app start.

## 6. API Integration Plan
- **Endpoint**: `https://dummyjson.com/products`
- **Method**: `GET`
- **Data Mapping**:
    - `title` -> Course Title
    - `description` -> Course Description
    - `price` -> Course Price
    - `thumbnail` -> Course Image
    - `rating` -> Rating

## 7. UI Component Breakdown
- **CourseCard**:
    - Props: `course`, `onPress`, `isFavourite`, `onToggleFav`
    - Layout: Image (top), Title (bold), Price (color), Heart Icon (absolute positioned).
- **CustomButton**:
    - Props: `title`, `onPress`, `type` (primary/secondary)
- **Screens**:
    - **Login**: Email/Pass inputs, "Login" button, "Go to Register" link.
    - **Home**: Search bar (optional), Filter (optional), FlatList of CourseCards.
    - **Details**: Large Image, Title, Price, Description, "Add to Favourites" button.

## 8. Testing & Debugging Workflow
1.  **Run**: `npx expo start` -> Press `w` for Web or scan QR with phone.
2.  **Debug**: Use `console.log` for Redux state changes.
3.  **Verify**:
    - Login works?
    - Data loads?
    - Navigation pushes/pops correctly?
    - Favourites persist after reload?

## 9. GitHub Submission Checklist
- [ ] Remove `node_modules` (handled by .gitignore).
- [ ] `README.md` with:
    - Project Name & Description.
    - Screenshots (Home, Details, Favourites).
    - Setup instructions.
    - GitHub Repo Link.
- [ ] Clean code (remove unused imports/comments).

## 10. Short App Demo Plan (Video)
1.  **Start**: Show Login Screen. Enter dummy creds -> Login.
2.  **Home**: Scroll through "courses".
3.  **Details**: Tap a course, show details.
4.  **Favourite**: Tap "Heart" on a course. Go back.
5.  **Tab Switch**: Go to "Favourites" tab. Show the saved course.
6.  **Persistence**: Reload app (shake -> reload). Show user is still logged in (optional) or Favourites are still there.
7.  **Logout**: Go to profile/logout button.

## 11. Fast Completion Tips
- **Keep Styles Simple**: Use standard padding/margin. Don't over-engineer CSS.
- **Dummy Auth**: Just check if email/password are not empty. Don't use a real backend.
- **Reuse**: Use the same `CourseCard` for Home and Favourites screens.

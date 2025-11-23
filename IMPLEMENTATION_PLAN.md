# SkillUp - Campus Resources (Assignment)

## 1. Project Overview
- **App Name**: SkillUp (UoM Course Finder)
- **Concept**: Browse and save online courses/textbooks using the Open Library API.
- **Tech Stack**: React Native (Expo), Redux Toolkit, React Navigation.

## 2. API Integration
- **Source**: [Open Library API](https://openlibrary.org/developers/api)
- **Endpoint Used**: `https://openlibrary.org/subjects/programming.json?limit=20`
- **Data Mapping**:
    - `title` -> Course/Book Title
    - `authors` -> Author Name
    - `cover_id` -> Used to fetch image from `covers.openlibrary.org`
    - `key` -> Unique ID

## 3. Setup Instructions
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run the App**:
    ```bash
    npx expo start
    ```
    - Press `w` for Web.
    - Scan QR code for Android/iOS (requires Expo Go).

## 4. Features
- **Authentication**: Dummy Login/Register (accepts any non-empty input).
- **Home**: Lists programming resources/textbooks.
- **Details**: Shows book cover, title, author, and description.
- **Favourites**: Save items to a local list (persisted via AsyncStorage).

## 5. Demo Script (Video)
1.  **Login**: Enter "Student" / "password" -> Click Login.
2.  **Home**: Scroll through the list of books (fetched from Open Library).
3.  **Details**: Click on a book (e.g., "The C Programming Language"). Show the cover and author.
4.  **Favourite**: Click the Heart icon. Go back.
5.  **Tabs**: Switch to "Favourites" tab. Show the saved book.
6.  **Persistence**: Reload the app (shake -> reload). Show the favourite is still there.

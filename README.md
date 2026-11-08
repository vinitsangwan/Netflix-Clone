<div align="center">

# 🎬 Netflix Clone

### A Full-Stack Movie Discovery & Personalized Recommendation Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-E50914?style=for-the-badge&logo=netflix&logoColor=white)](https://netflix-clone-bnwa.vercel.app/)

**Explore movies, search across global streaming platforms, and receive custom personalized recommendations tailored to your unique taste.**

</div>

---

## 📌 About

A Netflix-inspired full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). 

The platform integrates the **TMDB API** for worldwide movie discovery and features a **dynamic, user-specific recommendation engine**. Every registered user receives distinct movie recommendations based on their individual watchlist activity and search history.

It also features multi-platform streaming links, JWT authentication, a personal watchlist, and instant bilingual language switching (English & Hindi).

---

## ✨ Features

- 🎬 **Netflix-Inspired Responsive UI**: Dark-themed layout featuring signature glowing red arc dividers, hero section, FAQ accordions, and smooth horizontal scrolling carousels.
- 🎯 **Personalized Recommendation System**:
  - **Dynamic Genre Preference Scoring**: Automatically awards points based on user behavior (Watchlist additions = **+3**, Movie searches = **+1**).
  - **"Recommended For You"**: Hybrid ranking algorithm balancing personal genre weight ($60\%$) and TMDB movie rating ($40\%$).
  - **"Because You Searched for [Genre]"**: Dynamically targets the user's #1 most-searched genre using TMDB Discover.
  - **"Based on Your Watchlist"**: Directly queries TMDB Recommendations for movies currently in the user's personal list.
  - **Smart Filtering**: Automatically excludes already-saved titles to prevent redundant recommendations.
  - **Cold-Start Handling**: Friendly welcome message and curated trending titles for new users.
- 🔍 **Multi-Platform Movie Search**: Dedicated search interface with direct "Watch On" deep links for **Netflix**, **Amazon Prime Video**, **Disney+ Hotstar**, and **YouTube Movies**.
- 🌐 **Instant Bilingual Support**: Live one-click language switcher toggling all homepage copy between **English** and **Hindi**.
- 🔐 **User Authentication**: Secure registration and login powered by **JWT (JSON Web Tokens)** and **bcrypt.js** password hashing.
- ⭐ **Personal Watchlist Management**: Users can add, view, and remove movies from their own cloud-synced MongoDB watchlist.
- 🗄️ **MongoDB Database Integration**: Dedicated collections for Users, Watchlists, and UserPreferences.

---

## 🧠 Recommendation Algorithm

The recommendation engine uses a hybrid scoring model calculated per user:

$$\text{Final Rank Score} = (\text{User Genre Weight} \times 0.6) + (\text{TMDB Rating} \times 0.4)$$

| User Activity | Weight Awarded |
|:---|:---:|
| **Adds Movie to Watchlist** | **+3 points** to movie genres |
| **Searches a Movie Title** | **+1 point** to matched genres |

*Example:* 
- **Jen** adds and searches Sci-Fi movies ➔ Receives rows tailored to *Sci-Fi, Adventure, and Space Thrillers*.
- **Jerry** adds and searches Action movies ➔ Receives rows tailored to *Action, Crime, and High-Octane Thrillers*.

---

## 🛠️ Tech Stack

| Category | Technologies |
|:---|:---|
| **Frontend** | React.js, Vite, HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT (jsonwebtoken), bcrypt.js |
| **External APIs** | TMDB API (The Movie Database) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```text
Netflix-Clone/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Homepage with Hero, Trending & Personalized Carousels
│   │   │   ├── Search.jsx         # Dedicated Search Page with streaming provider links
│   │   │   ├── Login.jsx          # User Login page
│   │   │   └── Register.jsx       # User Registration page
│   │   ├── App.jsx                # Route declarations
│   │   ├── App.css                # Global and component styling
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT token verification
│   ├── models/
│   │   ├── User.js                # User schema (name, email, password)
│   │   ├── Watchlist.js           # Watchlist items schema
│   │   └── UserPreference.js      # Preference scores, search logs & excluded IDs
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth (register, login)
│   │   ├── watchlistRoutes.js     # /api/watchlist (CRUD watchlist)
│   │   └── preferenceRoutes.js   # /api/preferences & /api/recommendations
│   └── server.js                  # Express backend entry point
│
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vinitsangwan/Netflix-Clone.git
cd Netflix-Clone
```

### 2. Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create `.env` files in both `client/` and `server/`.

**Server `.env`** (`server/.env`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
```

**Client `.env`** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_TMDB_API_KEY=your_tmdb_api_key
```

> 💡 *Get a free TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api).*

### 4. Run the Application

**Run Backend (Terminal 1):**
```bash
cd server
node server.js
```

**Run Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 🚀 Future Improvements

- User movie ratings & community reviews
- Video trailers embedded directly in preview cards
- Social watchlists (share lists with friends)
- Email notifications for newly released movies in favorite genres

---

## 👨‍💻 Author

<div align="center">

### Vinit Sangwan

**B.Tech Computer Engineering**  
Army Institute of Technology, Pune

[![GitHub](https://img.shields.io/badge/GitHub-vinitsangwan-black?style=flat&logo=github)](https://github.com/vinitsangwan)

</div>

---

<div align="center">

**⭐ If you like this project, don't forget to star the repository!**

Made with ❤️ by **Vinit Sangwan**

</div>

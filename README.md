
<div align="center">

# 🎬 Netflix Clone

### A Full-Stack Movie Discovery Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-E50914?style=for-the-badge&logo=netflix&logoColor=white)](https://netflix-clone-bnwa.vercel.app/)

**Explore movies, search your favourites, and manage your personal watchlist.**

</div>

---

## 📌 About

A Netflix-inspired full-stack web application built using the MERN stack.

The application integrates the **TMDB API** to fetch dynamic movie data, enabling users to search for movies and access related movie links.

It also features user authentication, a personal watchlist, and a responsive interface.

## ✨ Features

- 🎬 Netflix-inspired responsive UI.
- 🔍 Movie search using TMDB API.
- 🎥 Dynamic movie data and posters.
- 🔗 External movie-related links.
- 🔐 User registration and login.
- 🔑 JWT-based authentication.
- ⭐ Personal watchlist management.
- 🗄️ MongoDB database integration.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt.js |
| API | TMDB API |
| Deployment | Vercel |

## 📂 Project Structure

```text
Netflix-Clone/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── README.md
```

## ⚙️ Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/vinitsangwan/Netflix-Clone.git
cd Netflix-Clone
```

**2. Install dependencies**

```bash
cd client
npm install
```

```bash
cd server
npm install
```

**3. Configure environment variables**

Create `.env` files in the client and server directories with the required configuration.

Server:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Client:
```env
VITE_API_URL=http://localhost:5000
```

Configure your TMDB API credentials using the variable names expected by your application.

**4. Run the application**

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

## 📸 Screenshots

<!-- Add actual application screenshots in the screenshots folder -->

![Homepage](screenshots/homepage.png)

![Movie Search](screenshots/search.png)

## 🚀 Future Improvements

- Advanced movie filtering and sorting.
- Personalised movie recommendations.
- Enhanced user profile management.
- Improved movie details pages.

## 👨‍💻 Author

**Vinit Sangwan**

B.Tech Computer Engineering | Army Institute of Technology, Pune

- GitHub: [vinitsangwan](https://github.com/vinitsangwan)
- LinkedIn: [Connect with me](https://www.linkedin.com/)

---

<div align="center">

**If you like this project, don't forget to ⭐ the repository!**
**Built with ❤️ by Vinit Sangwan**
</div>

# ⚽ React Football Dashboard

A comprehensive football statistics application developed with React and Redux. A modern web application where you can track leagues, teams, matches, and your favorite teams.

## 🚀 Features

### 🏆 League Management
- View popular leagues (Premier League, La Liga, Serie A, Bundesliga, etc.)
- Track standings with league detail page
- Real-time league information

### 👥 Team Tracking
- Discover popular teams
- Detailed team information (stadium, country, description)
- Team badges and images

### 📊 Match Tracking
- View recently played matches
- Match results and scores
- League-based match filtering

### ⭐ Favorites System
- Save your favorite teams
- View favorite teams on a single page
- Remove from favorites and bulk clear

### 🎨 Theme Support
- Dark/Light theme toggle
- Save theme preference with LocalStorage
- Consistent theme support across all pages

### ⚡ Performance
- State management with Redux
- Smart caching system for API requests
- Data persistence with LocalStorage

## 🛠️ Technologies Used

- **React 18** - UI development
- **Redux Toolkit** - State management
- **React Router v6** - Page routing
- **Axios** - HTTP requests
- **Bootstrap 5** - UI framework
- **TheSportsDB API** - Football data
- **LocalStorage** - Data persistence

## 📦 Installation

### Requirements
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repo
```bash
git clone [https://github.com/Erdem-Baran/react-football-dashboard.git](https://github.com/Erdem-Baran/react-football-dashboard.git)
cd react-football-dashboard
Install dependencies

Bash

npm install
Start the application

Bash

npm run dev
Open in your browser

http://localhost:5173
📁 Project Structure
react-football-dashboard/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Error.jsx
│   │   └── Loading.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Teams.jsx
│   │   ├── TeamDetail.jsx
│   │   ├── LeagueDetail.jsx
│   │   ├── TodaysMatches.jsx
│   │   └── Favorites.jsx
│   ├── layout/              # Layout components
│   │   └── MainLayout.jsx
│   ├── redux/               # Redux store and slices
│   │   ├── Store.jsx
│   │   ├── League.jsx
│   │   ├── GetTeams.jsx
│   │   ├── GetTeamDetail.jsx
│   │   ├── GetLeagueDetail.jsx
│   │   ├── TodaysMatchesSlice.jsx
│   │   ├── FavoritesSlice.jsx
│   │   └── ThemeSlice.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
🎯 Usage
Home Page
View popular leagues as cards

Click on a league to go to the detail page

Popular Teams
View 12 popular teams

Add/remove teams to favorites (❤️)

Click on a team to go to the detail page

League Details
View league standings

Review team statistics (P, W, D, L, GD, Pts)

Click on teams to go to their detail pages

Team Details
View team information

Access stadium, country, and description details

Add/remove team to favorites

Click on the team's league to go to the league page

Recent Matches
View the last 15 played matches

Match results and scores

Home and away teams

My Favorites
See all your favorite teams on a single page

Remove individually or clear all favorites

Click on a team to go to the detail page

Theme Switching
Change theme using the button in the top right corner

Your preferences are saved automatically

🔧 Redux Store Structure
JavaScript

{
  League: {
    leagues: [],
    loading: false,
    error: null,
    lastFetch: timestamp
  },
  Teams: {
    teams: [],
    loading: false,
    error: null,
    lastFetch: timestamp
  },
  TeamDetail: {
    teamDetail: {},
    cache: {},
    loading: false
  },
  LeagueDetail: {
    standings: [],
    leagueInfo: {},
    loading: false
  },
  TodaysMatch: {
    todaysMatches: [],
    loading: false
  },
  Favorites: {
    favoriteTeams: []
  },
  Theme: {
    mode: "dark" | "light"
  }
}
```
💾 Caching System
Smart caching system to optimize API requests:

Leagues: 10 minutes

Teams: 15 minutes

Team Details: 30 minutes

Matches: 5 minutes

League Details: 10 minutes

⚠️ Known Limitations
Search Feature: Search feature is not included due to API rate limit restrictions

API Limits: Request count is limited due to TheSportsDB free tier usage

Live Scores: Only past match results are shown

🤝 Contributing
Fork this repo

Create a new branch (git checkout -b feature/newFeature)

Commit your changes (git commit -m 'Added new feature')

Push your branch (git push origin feature/newFeature)

Create a Pull Request

👤 Contact
Erdem Baran - @Erdem-Baran

Project Link: https://github.com/Erdem-Baran/react-football-dashboard

🙏 Acknowledgements
TheSportsDB - For football data

Bootstrap - For UI components

React - For the framework

⭐ Don't forget to star this project if you liked it!

# Influencer Search Dashboard

A modern React + TypeScript application for searching and exploring influencer profiles across multiple social media platforms. Users can browse creators, view detailed analytics, and build a persistent shortlist of influencers for comparison.

---

## Tech Stack

* React 19
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Zustand (Persistent State Management)
* React Icons
* React Hot Toast

---

## Features

### Search & Filtering

* Search influencers by username or display name.
* Filter creators across:

  * Instagram
  * YouTube
  * TikTok
* Real-time search filtering.
* Dynamic result count.

### Profile Details

* Dedicated profile page.
* Detailed influencer statistics including:

  * Followers
  * Engagement Rate
  * Average Views
  * Average Likes
  * Average Comments
  * Posts (when available)
* Verified account indicator.
* Direct link to the creator's social profile.

### Influencer Shortlist

* Add influencers to a personal selection list.
* Remove individual influencers.
* Clear the complete selection.
* Duplicate prevention.
* Persistent storage using Zustand (saved across browser refreshes).

### User Experience

* Responsive layout.
* Sticky navigation header.
* Platform-specific icons.
* Toast notifications.
* Clean and modern UI built with Tailwind CSS.

---

## Project Structure

```text
src/
├── assets/
│   └── data/
├── components/
├── pages/
├── store/
├── types/
├── utils/
└── main.tsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

---

## State Management

The application uses Zustand with persistence middleware for:

* Selected influencer list
* Duplicate prevention
* Persistent browser storage

---

## Future Improvements

* Drag-and-drop reordering of selected influencers
* Sorting by followers or engagement
* Dark mode
* Pagination / virtual scrolling
* Advanced filtering options
* Export selected influencers
* Backend API integration

---

## Notes

This project was developed using React 19.

Persistent influencer selection is fully implemented using Zustand. Drag-and-drop reordering was explored using `@hello-pangea/dnd`; however, compatibility issues with the current React 19 environment prevented a stable implementation within the assignment timeframe. The remainder of the application, including search, filtering, routing, persistent state management, and profile exploration, is fully functional.

---

## Author

Kai

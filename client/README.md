# Keshev Web Application

## Project Structure

```bash
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── data/           # Static content dgit ata
├── services/       # Business logic and data fetching
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
└── utils/          # Utility functions
```

- `client/` - React frontend application
- `server/` - Express backend API
- `assets/` - Static assets

## Key Features

### Data Management

- Centralized content service
- Type-safe content interfaces
- Modular page structure

### Components

- Reusable page layouts
- RTL support
- Responsive design

### Styling

- TailwindCSS for styling
- Consistent color palette
- Mobile-first approach

## Code Organization

### Components

- `PageLayout`: Base layout component used across all pages
- `PageTitle`: Consistent page header with gradient background
- `Navbar`: Navigation component with mobile responsiveness

### Hooks

- `usePageData`: Custom hook for fetching page content
  ```typescript
  const { data, isLoading, error } = usePageData('pageName');
  ```

### Data Structure

```typescript
interface ContentItem {
  title: string;
  description: string;
  image?: string | null;
}

interface LocalPageContent {
  heading: string;
  subheading: string;
  body: ContentItem[];
  additional?: ContentItem[];
}
```

### RTL Support

- All text content is right-aligned
- Layout is mirrored for RTL reading
- Icons and images positioned accordingly

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Common Styling

- Container width: 70% on desktop
- Colors:
  - Primary: green-800
  - Secondary: orange-400
  - Text: gray-900
  - Backgrounds: white, transparent

### Page Structure

Each page follows a consistent layout:

1. PageTitle component
2. Content container (70% width)
3. RTL text alignment
4. Consistent spacing

## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL
- PNPM (recommended) or NPM

### Database Setup

```bash
# Log in as postgres user
psql -U postgres

# Create the database
CREATE DATABASE keshevplus;

# Exit psql
\q

# Initialize database schema (from project root)
npm run init-db
```

### Installation

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Running the Application

```bash
# Run both client and server
npm run dev

# Run only the backend
npm run server

# Run only the frontend
npm run client
```

## Development

The backend runs on http://localhost:5000
The frontend runs on http://localhost:5173

## Deployment

```bash
npm run build
```

## Environment Variables

Required environment variables:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

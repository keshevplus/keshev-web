# Keshev Web Application

## Project Structure

```bash
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── data/           # Static content data
├── services/       # Business logic and data fetching
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
└── utils/          # Utility functions
```

- `src/` - React frontend application
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

## Recent Architectural & Environment Changes (2025-05)

### 1. Environment-based Backend Routing
- The backend base URL is now determined by environment variables:
  - If both `NODE_ENV=development` and `VERCEL_ENV=development`, the backend uses `http://localhost:5000`.
  - In all other cases (production/staging), it uses `https://api.keshevplus.co.il`.
- This logic is implemented in the `getBaseUrl()` function in `api/contact.js` and should be used for all backend-to-backend requests.

### 2. Protocol Handling (HTTP vs HTTPS)
- Development uses `http` (no SSL) for simplicity.
- Production uses `https` for secure communication.
- Never mix protocols in production to avoid browser security issues.

### 3. Nodemailer Configuration
- All Nodemailer settings are now loaded from `.env.email` (or `.env` in some deployments) using `dotenv` at the top of the backend and mailer modules.
- Required variables: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `EMAIL_TO`.
- For Gmail, use an App Password for `EMAIL_PASS` (not your main Gmail password).

### 4. Removal of VERCEL_URL Reliance
- The system no longer relies on `VERCEL_URL` for backend routing.
- All routing logic is handled by explicit environment checks, reducing the risk of malformed URLs and protocol confusion.

### 5. Axios Error Handling Improvements
- Axios error responses in the backend no longer include circular or non-serializable objects.
- Only plain error details (message, stack, status, headers) are returned, preventing server crashes on error serialization.

### 6. Deployment/Production Notes
- Always ensure your production server uses HTTPS and a valid SSL certificate.
- Double-check all environment variables before deploying.
- Never commit `.env` or `.env.email` to version control.

---
These changes make the application more robust, secure, and easier to maintain across different environments. See the relevant code sections and `.env` examples for further details.


### Prerequisites

- Node.js
- PostgreSQL (NeonDB)
- pnpm (preferred)

### Database Setup

1. Create a Neon database and obtain the connection string (PostgreSQL URI).
2. Set the connection string in your `.env` file as `DATABASE_URL`.

### Installation

```bash
# Install all dependencies (root)
pnpm install

# Install client dependencies (if in client/)
cd client
pnpm install
cd ..
```

### Running the Application

```bash
# Run both client and server (from root)
pnpm run dev

# Run only the backend
pnpm run server

# Run only the frontend
pnpm run client
```

## Environment Variables (`.env`)

- Always use the format: `KEY=VALUE` (no spaces around `=`)
- Example for production:
  ```env
  VITE_API_BASE_URL=https://api.keshevplus.co.il
  VITE_DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
  ```
- For local development, you can use:
  ```env
  VITE_API_BASE_URL=http://localhost:5000
  ```

## Development

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## Deployment (Vercel)

The project uses the following deployment workflow:

1. **Build:** `pnpm run build`
2. **Add:** `git add .`
3. **Commit:** `git commit -m "Describe your changes"`
4. **Push:** `git push`
5. **Deploy:** `vercel --prod` (or use the Vercel dashboard)

### Viewing Logs
- Access runtime logs via the Vercel UI:  
  https://keshev-1d7sd1kqd-keshev-web.vercel.app/_logs  
- Or from your terminal run:  
  `vercel logs keshev-1d7sd1kqd-keshev-web.vercel.app`

Both client and server must be deployed for full functionality.

---

## Contact Form & Neon Database Integration

- The contact form submits data to `${VITE_API_BASE_URL}/api/contact`.
- The backend validates required fields and forwards data to the Neon database via `/api/neon-leads`.
- On success, the frontend shows a success message. On error, it displays the backend error message.
- To verify submissions are saved, check your admin panel or query the Neon DB directly.

### Troubleshooting
- **Form not submitting:** Ensure `VITE_API_BASE_URL` is set correctly and the backend is deployed.
- **Validation errors:** Make sure all required fields (`name`, `email`, `phone`, `message`) are filled.
- **500 errors:** Check backend logs for errors with Neon DB or forwarding logic.
- **CORS issues:** Allowed origins are set in the backend. Update them in `api/contact.js` if needed.

## Environment Variables

### Client (Vite)
- All variables exposed to the client must be prefixed with `VITE_` in your `.env` file.
- Access them in code as `import.meta.env.VITE_YOUR_KEY`.

### Server
- Use `process.env.YOUR_KEY` in Node.js/Express code.
- Do **not** use `import.meta.env` on the server.

### Sample .env
```env
# Server
DATABASE_URL=postgresql://<username>:<password>@<host>/<database>?sslmode=require
EMAIL_API_KEY=your_email_api_key




# Client (Vite) 
VITE_PUBLIC_KEY=your_public_key
VITE_SERVICE_ID=your_service_id
VITE_TEMPLATE_ID=your_template_id
VITE_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_PNPM_HOME=C:\Users\<user>\AppData\Local\pnpm
```

## Vite Config and Environment Variables
- To add more client-side environment variables, add them to your `.env` file with the `VITE_` prefix and reference them as `import.meta.env.VITE_YOUR_KEY` in your code.
- See `vite.config.ts` for how these variables are injected at build time.

---

Remove any unused or legacy variables (such as `VITE_SUPABASE_URL`) from your `.env` and codebase.

For more details, see the documentation for [Vite](https://vitejs.dev/), [Vercel](https://vercel.com/docs), and [Neon](https://neon.tech/docs/introduction/).


/**
 * The `Home` component serves as the main landing page for the application.
 * It dynamically renders content based on the `HomePageContent` data fetched
 * from the backend and provides a responsive, RTL-friendly layout.
 *
 * @component
 *
 * @description
 * - Fetches page data using the `usePageData` hook.
 * - Handles errors using the `useErrorHandler` hook.
 * - Dynamically maps sections by their IDs for easier access and rendering.
 * - Displays a loading spinner while data is being fetched.
 * - Renders error messages with a reload button in case of errors.
 * - Supports RTL layout and adjusts styles accordingly.
 * - Includes a hero section, intro text, rotating list, and CTA buttons.
 * - Dynamically renders additional sections with alternating background colors.
 *
 * @returns {JSX.Element} The rendered `Home` component.
 *
 * @example
 * ```tsx
 * import Home from './Home';
 * function App() {
 *   return <Home />;
 * }
 * ```
 *
 * @dependencies
 * - `usePageData`: Custom hook for fetching page data.
 * - `useErrorHandler`: Custom hook for error handling.
 * - `useSelector`: Redux hook for accessing global state.
 * - `Link`: React Router component for navigation.
 *
 * @remarks
 * - The component ensures accessibility and responsiveness.
 * - It uses Tailwind CSS for styling.
 * - The layout and content are optimized for RTL languages.
 */

  
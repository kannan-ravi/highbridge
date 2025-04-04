# HighBridge - Workflow Management System

A modern workflow management system built with React and Firebase.

## Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router v7
- **Flow Management**: React Flow (@xyflow/react)
- **Styling**: TailwindCSS
- **Authentication & Backend**: Firebase
- **Build Tool**: Vite

## Demo Login Credentials

For testing purposes, you can use the following demo account:

- Email: demo@highbridge.com
- Password: demo123

## Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Future Features

We are actively working on adding more features to enhance the workflow management system.

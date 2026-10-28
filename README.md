# HouseHelp Customer App

The HouseHelp Customer App is a cross-platform mobile application built with Expo, React Native, TypeScript, and Expo Router. It is organized around customer workflows such as authentication, booking home services, tracking tasks, making payments, and managing a profile.

## Getting started

Install dependencies and start the Expo development server:

```bash
npm install
npm start
```

Use the Expo CLI prompts to open the app on a development build, iOS or Android simulator, or web. The project currently uses npm and includes a `package-lock.json`.

Useful commands:

```bash
npm run ios
npm run android
npm run web
npm run lint
npx tsc --noEmit
```

## Project structure

```text
.
├── app/                         # Expo Router routes and layouts
│   ├── _layout.tsx              # Root route layout
│   ├── index.tsx                # Initial auth/session redirect
│   ├── (auth)/                  # Unauthenticated route group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── otp.tsx
│   └── (tabs)/                  # Main application route group
│       ├── _layout.tsx
│       └── index.tsx
├── assets/
│   ├── expo.icon/               # Expo icon source assets
│   ├── fonts/                   # App fonts
│   ├── icons/                   # Reusable icon assets
│   ├── images/                  # App, splash, and tab images
│   └── splash/                  # Splash-screen assets
├── scripts/
│   └── reset-project.js         # Expo starter reset utility
├── src/
│   ├── api/                     # Shared API client and endpoint definitions
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── components/              # Shared UI components
│   │   ├── common/
│   │   ├── feedback/
│   │   └── layout/
│   ├── constants/               # App configuration and route constants
│   │   ├── config.ts
│   │   └── routes.ts
│   ├── features/                # Domain-focused customer features
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── screens/
│   │   ├── booking/
│   │   │   ├── bookingService.ts
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── screens/
│   │   ├── customer-tasks/
│   │   │   ├── taskService.ts
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── screens/
│   │   ├── payments/
│   │   │   ├── paymentService.ts
│   │   │   ├── components/
│   │   │   └── screens/
│   │   └── profile/
│   │       ├── components/
│   │       └── screens/
│   ├── hooks/                   # App-wide hooks
│   ├── navigation/              # Navigation types and navigation helpers
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   ├── store/                   # Shared application state
│   │   ├── index.ts
│   │   └── slices/
│   ├── theme/                   # Shared design tokens
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── types/                   # Shared domain types
│   │   ├── booking.d.ts
│   │   ├── task.d.ts
│   │   └── user.d.ts
│   └── utils/                   # Reusable formatting and validation helpers
│       ├── currency.ts
│       ├── date.ts
│       └── validation.ts
├── app.json                     # Expo app configuration
├── expo-env.d.ts                # Expo TypeScript environment declarations
├── package.json                 # Dependencies and npm scripts
└── tsconfig.json                # TypeScript configuration and aliases
```

## Architecture notes

- **Routing:** Expo Router discovers screens and layouts from the root `app/` directory. Parenthesized folders are route groups and do not appear in the URL.
- **Feature code:** Keep feature-specific screens, components, hooks, and API operations inside their `src/features/<feature>/` directory.
- **Shared code:** Put reusable UI in `src/components/`, app-wide hooks in `src/hooks/`, and cross-feature helpers in `src/utils/`.
- **API and state:** Keep shared request setup in `src/api/`; feature-specific service calls belong with their feature. Shared state belongs in `src/store/`.
- **Design system:** Use the shared tokens in `src/theme/` for consistent colors, spacing, and typography.
- **TypeScript imports:** The `@/*` alias resolves to `src/*`; `@/assets/*` resolves to `assets/*`.

This repository currently contains the initial application structure and route/service placeholders. Feature behavior can be added incrementally without moving route files out of `app/`.

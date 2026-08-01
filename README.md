# Website Module

This is a standalone website module extracted from the features folder. It contains all the public-facing website components and can be run independently.

## Structure

```
src/website/
├── components/          # All website components
│   ├── common/         # Shared components (Navbar, Footer, Button, Card)
│   ├── home/           # Home page components
│   ├── about/          # About page components
│   ├── Explore/        # Explore section components
│   ├── Features/       # Features page components
│   ├── price/          # Pricing page components
│   └── product/        # Product page components
├── layouts/            # Layout components
├── routes/             # Route definitions
├── hooks/              # Custom hooks (useWindowSize)
├── assets/             # Images and static assets
└── index.ts            # Main exports

```

## Usage

### Importing Components

```typescript
import { Home, About, Navbar, Footer } from '../website';
```

### Using Routes

```typescript
import { websiteRoutes } from '../website/routes/websiteRoutes';
```

## Dependencies

The website module uses:
- `react` and `react-dom`
- `react-router-dom` for routing
- `framer-motion` for animations
- `lucide-react` for icons
- Tailwind CSS for styling

All dependencies should be available in the main project's `package.json`.

## Assets

Assets are copied to `src/website/assets/`:
- `images/` - General images
- `explore/` - Explore section images
- `profile/` - Team profile images

Public assets (logos) should be in the `public/` folder at the project root.

## Routes

The website routes are defined in `src/website/routes/websiteRoutes.tsx` and include:
- `/` - Home
- `/features` - Features page
- `/product` - Product page
- `/pricing` - Pricing page
- `/about` - About page
- `/contact` - Contact page
- `/loginsignup` - Login/Signup page
- `/whytiiron` - Why Practivo page
- `/whomfor` - Who It's For page
- `/ourplatform` - Our Platform page


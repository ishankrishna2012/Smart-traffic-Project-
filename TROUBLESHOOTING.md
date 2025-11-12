# 🛠️ Troubleshooting Guide

## Common Issues & Solutions

---

## Installation Issues

### Problem: `npm install` fails
**Solution:**
```bash
# Clear cache
npm cache clean --force

# Remove lock files
rm -rf package-lock.json node_modules/

# Reinstall
npm install
```

### Problem: Node version compatibility
**Solution:**
```bash
# Check Node version (need 16+)
node -v

# Update Node
# macOS: brew install node@18
# Windows: Download from nodejs.org
```

---

## Development Server Issues

### Problem: Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- --port 3001

# Or kill existing process
# macOS/Linux: lsof -ti:3000 | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

### Problem: `VITE_GOOGLE_MAPS_KEY not defined`
**Solution:**
```bash
# Create .env file in root directory
cat > .env << EOF
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_WEATHER_API_KEY=your_key_here
EOF
```

### Problem: Hot reload not working
**Solution:**
```bash
# Restart dev server
# Ctrl+C to stop
# npm run dev to restart
```

---

## Build Issues

### Problem: Build fails with TypeScript errors
**Solution:**
```bash
# Check types
npm run type-check

# Fix issues or disable strict mode in tsconfig.json
"strict": false
```

### Problem: Large bundle size
**Solution:**
```json
{
  "build": {
    "rollupOptions": {
      "output": {
        "manualChunks": {
          "recharts": ["recharts"],
          "react": ["react", "react-dom"]
        }
      }
    }
  }
}
```

### Problem: `dist` folder is empty after build
**Solution:**
```bash
# Clean and rebuild
rm -rf dist/
npm run build

# Check for errors in console output
```

---

## Component & Routing Issues

### Problem: Routes not working
**Solution:**
```typescript
// Verify in App.tsx:
// 1. BrowserRouter is wrapping Routes
// 2. Route paths match Link destinations
// 3. Components are correctly imported
```

### Problem: Navigation not showing
**Solution:**
```typescript
// Check Navigation.tsx:
// 1. useLocation hook is working
// 2. isActive function is correct
// 3. Classes are applied properly
```

### Problem: Component not displaying
**Solution:**
```typescript
// Check:
// 1. Component is exported as default
// 2. Import path is correct
// 3. No TypeScript errors
// 4. Props are correct type
```

---

## State Management Issues

### Problem: Data not persisting
**Solution:**
```typescript
// Verify Zustand store:
import { useTrafficStore } from './store/trafficStore';
const { buses, setBuses } = useTrafficStore();

// Test in console:
// useTrafficStore.getState()
```

### Problem: State not updating
**Solution:**
```typescript
// Use React DevTools:
// 1. Install Redux DevTools extension
// 2. Check state changes in component
// 3. Verify setState is called correctly
```

---

## Styling Issues

### Problem: Tailwind classes not working
**Solution:**
```bash
# Rebuild Tailwind
npm run build

# Check tailwind.config.js paths
# Verify index.css has @tailwind directives
```

### Problem: Styles conflicting
**Solution:**
```css
/* In index.css, add specificity */
@layer components {
  .custom-card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

### Problem: Mobile view not responsive
**Solution:**
```html
<!-- Verify in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Test with Chrome DevTools mobile view -->
```

---

## API & Networking Issues

### Problem: API requests failing (CORS error)
**Solution:**
```typescript
// Use CORS proxy or enable on backend
// Or update axios config:
import axios from 'axios';

const apiClient = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
```

### Problem: API requests timeout
**Solution:**
```typescript
// Increase timeout in axios
axios.defaults.timeout = 15000; // 15 seconds
```

### Problem: Environment variables not loading
**Solution:**
```bash
# 1. Verify .env file in root
# 2. Restart dev server after changing .env
# 3. Use VITE_ prefix for variables
# 4. Access with: import.meta.env.VITE_KEY
```

---

## Location & Map Issues

### Problem: User location not updating
**Solution:**
```typescript
// Check geolocation in browser:
// 1. Allow location access
// 2. Check browser console for errors
// 3. Try HTTPS (required for geolocation)
```

### Problem: Map not displaying
**Solution:**
```typescript
// Check Google Maps API:
// 1. API key is valid
// 2. Maps JavaScript API is enabled
// 3. Key is not restricted to wrong URLs
// 4. Billing is enabled (for paid features)
```

### Problem: Distance calculation wrong
**Solution:**
```typescript
// Verify coordinate format:
// Latitude: -90 to 90
// Longitude: -180 to 180
// Check DPS Dubai coords: 25.0396, 55.1219
```

---

## Performance Issues

### Problem: App is slow
**Solution:**
```bash
# 1. Check network tab in DevTools
# 2. Reduce API calls
# 3. Implement pagination
# 4. Enable caching
# 5. Lazy load routes

import { lazy, Suspense } from 'react';
const LiveMap = lazy(() => import('./pages/LiveMap'));

// Use with Suspense:
<Suspense fallback={<Loading />}>
  <LiveMap />
</Suspense>
```

### Problem: Memory leaks
**Solution:**
```typescript
// Clean up in useEffect:
useEffect(() => {
  const interval = setInterval(() => {
    // update data
  }, 1000);
  
  // Cleanup function
  return () => clearInterval(interval);
}, []);
```

---

## Browser Compatibility Issues

### Problem: App not working in Safari
**Solution:**
```bash
# Add polyfills if needed
npm install core-js

# Import in main.tsx
import 'core-js';
```

### Problem: Mobile browser issues
**Solution:**
```html
<!-- Add to index.html -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

---

## Deployment Issues

### Problem: Vercel deployment fails
**Solution:**
```bash
# Check build logs
vercel logs --follow

# Ensure environment variables are set
vercel env add VITE_GOOGLE_MAPS_KEY

# Rebuild
vercel --prod --force
```

### Problem: GitHub Pages deployment
**Solution:**
```javascript
// In vite.config.ts
export default defineConfig({
  base: '/Smart-traffic-Project-/',
  // ... rest of config
});
```

### Problem: Blank page after deployment
**Solution:**
```bash
# 1. Check console for errors
# 2. Verify build output (dist folder)
# 3. Check environment variables
# 4. Clear browser cache
```

---

## Debugging Tips

### Enable Verbose Logging
```typescript
// Add to main.tsx
if (import.meta.env.DEV) {
  console.log('Development mode enabled');
  console.log('Available env vars:', import.meta.env);
}
```

### Use React DevTools
1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Go to Components tab
4. Inspect component hierarchy
5. Check props and state

### Use Browser DevTools
```javascript
// In console:
// Check state
useTrafficStore.getState()

// Trigger update
useTrafficStore.getState().setBuses([])

// Monitor network
// Open Network tab to see API calls
```

### Add Debug Points
```typescript
const component = () => {
  console.log('Component mounted');
  
  useEffect(() => {
    console.log('Effect running');
    return () => console.log('Cleanup');
  }, []);
  
  return <div>Debug here</div>;
};
```

---

## Getting Help

### Before asking for help, check:

1. **Console errors** - Check browser console (F12)
2. **Network tab** - Check API calls and responses
3. **Documentation** - Read README.md and SETUP.md
4. **Google** - Search for the exact error message
5. **Stack Overflow** - Search similar issues
6. **GitHub Issues** - Check project issues

### Error reporting:

Include in issue:
- Error message (full, from console)
- Steps to reproduce
- Expected vs actual behavior
- Node/npm versions
- Browser and OS
- Environment variables (sanitized)
- Relevant code snippet

---

## Quick Fixes Checklist

- [ ] Node version 16+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] .env file created with API keys
- [ ] Dev server running (`npm run dev`)
- [ ] No TypeScript errors
- [ ] Browser console shows no errors
- [ ] Network requests successful
- [ ] Routes working correctly
- [ ] Styles displaying properly
- [ ] State management functional

---

## Still Stuck?

1. **Restart everything**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check logs carefully**
   - Terminal output
   - Browser console (F12)
   - Network tab
   - Application tab

3. **Isolate the issue**
   - Comment out suspicious code
   - Test individual components
   - Check one feature at a time

4. **Search for solutions**
   - Error message on Google
   - GitHub issues
   - Stack Overflow
   - Official documentation

---

**Version**: 1.0.0  
**Last Updated**: November 2025

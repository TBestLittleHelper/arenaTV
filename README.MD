## Dev

It's recomended to point the API to a test enviorment during development. Create a .env file and add a value for 

```env
API_TARGET_URL=""
```

The URL should be a lila instance and have /api/ at the end.

To watch during development use 

```bash
npm run dev
```

## Build and Deployment

```bash
npm run build
```

It is developed to target Github pages. An action is run on commits to main branch, that will build and deploy the page.
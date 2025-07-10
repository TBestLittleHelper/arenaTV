## Dev

It's recomended to point the API to a test enviorment during development. Create a .env file and add a value for 

```env
API_TARGET_URL=""
```

The URL should be a lila instance and have /api/ at the end.

To watch during development use 

npm run dev


## Build
```bash
npm run build
```

## Deployment
Github pages. Action is run on commits to main branch.

# Fix localStorage is not defined error

## Steps

- [x] Fix `client/utils/fetchApi.ts` — add SSR-safe guards for `localStorage` and `window`
- [x] Fix `client/app/(admin)/dashboard/page.tsx` — convert to Client Component with `useState` + `useEffect`
- [x] Fix `client/app/(main)/home/page.tsx` — convert to Client Component with `useState` + `useEffect`
- [x] Test dashboard loads without error

# TODO - Update Login and Register Pages to use usePostApi

## Task

Read the new usePostApi and update the login and register page to use it instead of fetchApi directly.

## Steps

- [x] 1. Analyze the codebase - read usePostApi.tsx, login/page.tsx, register/page.tsx, apiClient.tsx, useForm.ts
- [x] 2. Update Login page to use usePostApi hook
- [x] 3. Update Register page to use usePostApi hook
- [ ] 4. Test the changes

## Notes

- Both pages currently use `fetchApi` utility directly with `await fetchApi(...)`
- Replace with `usePostApi` hook which provides better states management

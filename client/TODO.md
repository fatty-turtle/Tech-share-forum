# Task: Fix Home Page Client-Server Data Fetching

## Steps to Complete (Approved Plan):

- [x] **Step 1**: Create types file `client/types/home.ts` for API responses
- [x] **Step 2**: Update `client/app/(main)/home/page.tsx` - Add server-side fetches for 'post/trend', 'tag', 'tag/trend' using fetchApi + Promise.allSettled. Pass data/errors to Post and Dashboard.
- [x] **Step 3**: Refactor `client/app/(main)/home/Post.tsx` - Use props for postTrendData and tagData. Render tags filter, posts list, handle errors/loadings. Integrate PostList if applicable.
- [x] **Step 4**: Refactor `client/app/(main)/home/Dashboard.tsx` - Use tagTrendData prop for popular tags, handle states.
- [x] **Step 5**: Test in dev server: Check data loads once, no duplicate fetches, error handling works.
- [x] **Step 6**: Clean up TODO.md and complete.

✅ All steps completed! Home page now fetches data once on server, passes to components handling states/errors.

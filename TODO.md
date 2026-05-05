# TSF Project Fixes - Server & Client Startup

## Steps:

- [ ] 1. Uncomment PostController methods (deletePost, createPost, updatePost, etc.) in server/src/controllers/post.controller.js
- [ ] 2. Update client/postcss.config.mjs for TailwindCSS v4 compatibility
- [ ] 3. Disable experimental CSS optimization in client/next.config.ts to fix 'critters' error
- [ ] 4. Install client dependencies: cd client && npm install
- [ ] 5. Test server: cd server && node src/server.js
- [ ] 6. Test client: cd client && npm run dev
- [ ] 7. [Optional] Test DELETE /post/:id endpoint

Current progress: Starting step 1

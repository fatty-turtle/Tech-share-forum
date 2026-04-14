# Fix Register Endpoint - "Cannot read properties of undefined (reading 'bind')"

## Status: ✅ In Progress

**Root cause**: Repositories instantiated in AccountService constructor before `initDB()` completes, so `this.pool` is undefined in custom methods like `createAccountWithVerification()` and `createUser()` during register flow.

## Steps (complete one by one):

- [x] 1. Analysis complete: Issue in repo custom methods .bind(this.pool) where pool null.
- [x] 2. Update account.controller.js: Lazy-init service in async handlers.
- [x] 3. Patch account.repository.js: Add pool null-check + fix password column (password -> password_hash).
- [x] 4. Patch user.repository.js: Add pool null-check in createUser.
- [ ] 5. Test register endpoint.
- [ ] 6. Run seeds and verify.

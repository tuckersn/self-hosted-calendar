# Calendar Application
Experimental task management & calendar app developed as a TypeScript mono repo.

Following technologies used in this project:
- TypeScript
- NodeJS
- React
- GraphQL
- PNPM & PNPM workspaces


# Commands

## Build
```
pnpm turbo run build
```

## Creating a new package (/scripts/new-package.js)
```bash
pnpm new
```
then when prompted enter your package name
```
New package name (excluding @internal prefix): my-package-name
```

## Installing a workspace package into another workspace package
```
cd ./<instalee_package_dir>
pnpm add --workspace <target_package>
```

## Generate dependency graph
```
pnpm graph
```

## Debugging
### **Web**
```
cd ./packages/web
pnpm start
```
### **Server**
```
node ./packages/dist/main.js
```




# Notable todos
- Implement refresh/access tokens instead of daily localStorage tokens
- Add weekly and monthly calendars
- Add a date selector on the calendar page
- Add Postgres tables for enum values for manual queries
- Look into a GraphQL API
- Validate token in App and set user to logged out if their token is invalid
- Redo task experiment, the squares don't work
- Implement Task API
- Implement Task Board API
- Implement Calendar API
- Add query builder
- Add query options to queries for things like restricting the query to particular task boards, calendars, or users
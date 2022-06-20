# Calendar Application
Experimental task management & calendar app developed as a TypeScript mono repo.

Following technologies used in this project:
- TypeScript
- NodeJS
- React
- GraphQL
- PNPM & PNPM workspaces


# Setup Guide
This application is still early in development, the setup process will get easier with time.

### 1. Tool installation
npm install -g pnpm typescript

### 2. Install dependencies
pnpm install

### 3. Install Postgres
You'll need to setup your own Postgres instance, later there will be a docker compose or more detailed tutorial.

Run the query in sql/postgres/create_database.sql

### 4. Copy .env.template file to a file called .env
Then you will need to fill out all the info in in the file such as the Postgres credentials, JWT secret, and importantly the ADMIN_OVERRIDE_KEY at the bottom.

### 5. Build the project
pnpm turbo run build

### 6. Start the API server and web UI
In a new terminal run 'node ./packages/server/dist/main.js' to star the API.
In another terminal navigate to ./packages/web and run 'pnpm start'.


### 7. Use the API_OVERRIDE_KEY to create a user
Call the API route 'POST /user/admin/' with the authorization header of 'OVERRIDE yourOverrideKey' 

### 8. Good luck testing!
A window in your web browser will open shortly.




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
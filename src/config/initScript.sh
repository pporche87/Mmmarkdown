npm install
brew services start postgresql
npm run db:init
npm run migrate:latest
npm run start:dev
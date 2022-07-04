FROM node:18-alpine

WORKDIR /srv/calendar
ADD ./ ./

RUN npm install -g pnpm typescript
RUN pnpm install
RUN pnpm turbo run deploy

CMD ["node", "./packages/server/dist/main.js"]
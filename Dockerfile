# deploy a next.js react app

FROM node:16-bullseye-slim as builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Run tests
RUN npm run test

FROM node:16-bullseye-slim as runner
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]






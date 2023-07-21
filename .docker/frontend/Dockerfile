FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --foreground-scripts=true --ignore-scripts=false --force && npm cache clean --force

COPY tsconfig*.json ./
COPY .eslintrc.js ./
COPY .prettierrc ./
COPY public ./public
COPY src ./src
COPY .env ./

RUN npm run lint
RUN npm run build

FROM nginx:alpine as runner

COPY --from=builder /app/build /usr/share/nginx/html

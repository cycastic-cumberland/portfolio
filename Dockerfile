FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

ARG VITE_POCKETBASE_URL

RUN echo "${VITE_POCKETBASE_URL}" > /.env
RUN npm run build

FROM nginx:1.25.3-alpine-slim

COPY conf/default.conf /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80


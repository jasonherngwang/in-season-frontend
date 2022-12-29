
# Stage 1: Build app using Node.js
# Node 18 base image
FROM node:18-alpine AS build-stage
# Set working directory
WORKDIR /in-season-frontend
# Copy app files
COPY . .
# Clean install of all project dependencies, based on package-lock.json
RUN npm ci 
# Build the app
RUN npm run build

# Stage 2: Bundle static assets with Nginx; discard Node.js
FROM nginx:1.23.3-alpine AS production
ENV NODE_ENV production
# Copy built assets from Stage 1
COPY --from=build-stage /in-season-frontend/dist /usr/share/nginx/html
# Copy nginx.conf
COPY /nginx_site_proxy.conf /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/nginx.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
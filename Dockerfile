# Etapa 1: Construcción de la aplicación Angular con versión fija compatible
FROM node:24.15.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir la aplicación con Nginx con versión fija
FROM nginx:1.25.3-alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
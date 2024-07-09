FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
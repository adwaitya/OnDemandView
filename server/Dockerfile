FROM node:18-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
RUN apk update
RUN apk add
RUN apk add ffmpeg
COPY . .
EXPOSE 8000
EXPOSE 8001
# Build the TypeScript code
RUN npm run build
CMD [ "npm", "run", "server"]

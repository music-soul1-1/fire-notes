# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json .

# Clean npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

ENV PORT=3000
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

# Start the app using npm run dev command
CMD [ "npm", "run", "dev" ]

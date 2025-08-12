FROM node:20

# Create app directory
WORKDIR /app

COPY ./ ./

RUN npm install


CMD ["npm", "start"]

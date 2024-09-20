FROM node:20.10.0

WORKDIR /server
COPY package*.json .
COPY . .
RUN npm install .
RUN npm install -g nodemon

EXPOSE 3000
CMD npx ts-node src/index.ts

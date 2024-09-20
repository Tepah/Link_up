FROM node:20.10.0

WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install .
RUN npm install -g nodemon

EXPOSE 5173
CMD ["npm", "run", "dev"]

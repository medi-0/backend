FROM node:19
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# for prod 
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "." ]

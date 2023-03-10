# FROM node:19
FROM node:19-alpine3.17

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p {pdfs,qrs}
COPY package*.json ./
RUN apk add g++ make py3-pip
RUN npm install
# for prod 
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 5001
CMD [ "node", "." ]

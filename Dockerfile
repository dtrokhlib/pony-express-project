FROM node:16

COPY package.json .
RUN npm install --only=prod
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
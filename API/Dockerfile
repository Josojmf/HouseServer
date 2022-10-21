FROM node:16
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY . .
RUN ls -a
RUN npm install
EXPOSE 8000
CMD ["npm","run","dev"]

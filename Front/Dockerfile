FROM node:16
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY . .
RUN ls -a
RUN npm install
EXPOSE 3000
RUN ip a
CMD ["npm","run","start"]

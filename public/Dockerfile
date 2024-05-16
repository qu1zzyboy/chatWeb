FROM node:15
WORKDIR /app/public
COPY package.json yarn.lock /app/
RUN npm install
COPY ./ /app/public/
EXPOSE 5000

CMD ["npm","start"]


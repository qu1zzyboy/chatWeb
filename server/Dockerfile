FROM node:15
WORKDIR /app/server
COPY ./package.json /app/server/
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "DEV" ];\
    then npm install;\
    else npm install --only=production;\
    fi
COPY . /app/server/
ENV PORT 3000
EXPOSE ${PORT}


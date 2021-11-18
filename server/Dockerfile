FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV production
ENV PORT 8081
EXPOSE 8081
ENV WAIT_VERSION 2.7.2
# RUN apt-get -q update && apt-get -qy install netcat
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
# RUN chmod +x /wait
# RUN chmod +x wait-for-it.sh
RUN ls sleep.sh
RUN chmod +x sleep.sh
CMD [ "node", "build/index.js" ]
USER node
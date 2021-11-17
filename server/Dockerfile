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
CMD [ "node", "build/index.js" ]
USER node
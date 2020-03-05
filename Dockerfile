FROM node:12.16

WORKDIR /usr/paralogs

COPY ./package.json .
COPY ./tsconfig.json .
COPY ./yarn.lock .
COPY ./packages/shared/package.json ./packages/shared/
COPY ./packages/back/package.json ./packages/back/

RUN yarn global add typescript@3.8
RUN yarn

COPY ./packages/shared ./packages/shared/
COPY ./packages/back ./packages/back/

RUN yarn build

WORKDIR /usr/paralogs/packages/back/

CMD ["npm", "start"]
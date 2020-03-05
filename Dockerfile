FROM node:12.16 as builder

WORKDIR /paralogs

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

# --------------------------------------------------------------

FROM node:12.16

WORKDIR /paralogs
COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/shared/package.json ./packages/shared/
COPY ./packages/back/package.json ./packages/back/

RUN yarn --production

COPY --from=builder /paralogs/packages/shared/dist /paralogs/packages/shared/dist/
COPY --from=builder /paralogs/packages/back/dist /paralogs/packages/back/dist/

WORKDIR /paralogs/packages/back/

CMD ["npm", "run", "start"]

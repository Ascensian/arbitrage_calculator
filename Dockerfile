FROM node:16-alpine as compilator
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=compilator /app /app
COPY --from=compilator /app/package.json /app/package.json
RUN npm i --omit=dev
CMD ["npm", "start"]
FROM node:20-alpine as compilator
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g typescript
RUN tsc

FROM node:20-alpine
WORKDIR /app
COPY --from=compilator /app /app
COPY --from=compilator /app/package.json /app/package.json
RUN npm i --omit=dev
CMD ["node", "dist/index.js"]
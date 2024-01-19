FROM node:18
WORKDIR /usr/src/app

COPY . ./

# building the app
RUN npm i
RUN npm run build
ENV NEXT_TELEMETRY_DISABLED 1
# Running the app
CMD [ "npm", "start" ]
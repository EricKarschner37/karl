FROM node:16.7 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV REACT_APP_BACKEND_URL="https://karl-api-karl.apps.okd4.csh.rit.edu"
RUN yarn build

FROM cr.galenguyer.com/nginx/nginx:latest
COPY --from=build-deps /app/build /app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

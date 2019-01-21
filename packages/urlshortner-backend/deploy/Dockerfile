FROM node:10.15.0

RUN mkdir /app
WORKDIR /app

COPY ../package.json ../package-lock.json ..app.js ../bin ../config ../migrations ../models ../public ../routes ./
RUN npm install
RUN npm rebuild

COPY .. .

CMD ["npm", "start"]

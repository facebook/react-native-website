# SWAMI KARUPPASWAMI THUNNAI

FROM node

COPY . /rn_website
WORKDIR /rn_website/website

RUN npm install

CMD ["npm", "start"]

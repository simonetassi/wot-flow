# Specify Node Version
FROM node:lts-alpine AS development

# Specify Working directory inside container
WORKDIR /wot-flow/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./

# Install deps inside container
RUN npm install

RUN npm run build

EXPOSE 3001

################
## PRODUCTION ##
################
# Build another image named production
FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /thomas/src/app

COPY --from=development /wot-flow/src/app/ .

EXPOSE 3001

# run app
CMD [ "node", "dist/main"]



FROM node:20.11-slim AS build

WORKDIR /app
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

FROM node:20.11-slim
WORKDIR /app
COPY --from=build /app ./

# Expose port
EXPOSE 80

# Run app
CMD ["yarn", "server"]

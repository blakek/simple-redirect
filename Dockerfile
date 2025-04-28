# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile

ENTRYPOINT [ "bun", "run", "src/index.ts" ]

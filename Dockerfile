FROM oven/bun:latest

WORKDIR /app/neo-siakad

COPY package.json ./
COPY bun.lockb ./

RUN bun install --production

COPY . .


ENV NEXT_TELEMETRY_DISABLED 1


RUN bun run build
CMD bun start


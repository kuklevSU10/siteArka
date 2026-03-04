FROM node:22-slim

RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw@2026.2.26

WORKDIR /workspace

EXPOSE 18789

CMD ["sh", "-c", "openclaw gateway run --port 18789 --bind lan --allow-unconfigured"]

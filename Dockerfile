# ==========================================
# UPshift AI - Production Multi-Stage Dockerfile
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm ci
RUN cd server && npm ci

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build frontend and backend production bundles
RUN cd client && npm run build
RUN cd server && npm run build

# ==========================================
# Production Runtime Stage
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Install server production dependencies only
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy built artifacts from builder stage
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 3001

WORKDIR /app/server
CMD ["node", "dist/index.js"]

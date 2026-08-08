#!/bin/sh
set -e

echo "Applying database migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma

if [ "$RUN_SEED" = "true" ]; then
  echo "Running seed..."
  npx tsx prisma/seed.ts
fi

echo "Starting Next.js..."
exec node server.js

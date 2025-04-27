# Use Node.js 20 base image (LTS)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install necessary OS packages (for Prisma binaries and sharp-like libs if needed)
RUN apk add --no-cache openssl

# Install dependencies
COPY package.json ./
RUN npm install --frozen-lockfile 

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN  npm run build:socket

# Expose ports

ARG DATABASE_URL ,  DIRECT_URL, JWT_SECRET, Password, NEXT_Public_Key, Private_Key, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_URL

ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV JWT_SECRET=$JWT_SECRET
ENV Password=$Password
ENV NEXT_PUBLIC_KEY=$NEXT_Public_Key
ENV PRIVATE_KEY=$Private_Key
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_API_KEY=$NEXT_PUBLIC_CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
ENV CLOUDINARY_URL=$CLOUDINARY_URL

EXPOSE 1000

# Set environment variables
ENV NODE_ENV production

# Start both servers
# You can use a simple shell script or `concurrently`, but let's keep it simple here
CMD ["npm", "run", "start:socket"]

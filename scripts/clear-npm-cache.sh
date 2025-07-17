#!/bin/bash
# Clear npm cache and configuration

echo "Clearing npm cache..."
npm cache clean --force

echo "Removing npm configuration..."
rm -rf ~/.npmrc
rm -rf ~/.npm

echo "Setting up fresh npm configuration..."
npm config set registry https://registry.npmjs.org/
npm config set @fortawesome:registry https://registry.npmjs.org/
npm config set @atproto:registry https://registry.npmjs.org/
npm config set @gsap:registry https://registry.npmjs.org/
npm config set @types:registry https://registry.npmjs.org/
npm config set @vercel:registry https://registry.npmjs.org/
npm config set @eslint:registry https://registry.npmjs.org/
npm config set @stylistic:registry https://registry.npmjs.org/
npm config set @typescript-eslint:registry https://registry.npmjs.org/
npm config set always-auth false
npm config set audit false
npm config set fund false

echo "npm configuration cleared and reset!"
echo "Current npm config:"
npm config list 
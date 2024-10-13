# How to set up yarn berry

1. Install yarn
```bash
npm install -g yarn
# or
brew install yarn
```

2. Init project with yarn
```bash
yarn init
```

3. Set version to 2(Berry)
```
yarn set version berry
```

4. Create a new nest project
```
yarn dlx -p @nestjs/schematics -p @nestjs/cli@latest nest new nest-sample --package-manager yarn
```

# Jester template for testing with NestJS


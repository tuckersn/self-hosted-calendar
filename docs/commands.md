# Commands

## Build
```
pnpm turbo run build
```

## Creating a new package (/scripts/new-package.js)
```bash
pnpm new
```
then when prompted enter your package name
```
New package name (excluding @internal prefix): my-package-name
```

## Installing a workspace package into another workspace package
```
cd ./<instalee_package_dir>
pnpm add --workspace <target_package>
```

## Generate dependency graph
```
pnpm graph
```

## Debugging
### **Web**
```
cd ./packages/web
pnpm start
```
### **Server**
```
node ./packages/dist/main.js
```
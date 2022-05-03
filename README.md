# Calendar Application
Experimental task management app developed as a TypeScript mono repo.

# Commands

## Build
```
pnpm turbo run build
```

## Creating a new package
```bash
pnpm new
```
then when prompted enter your package name
```
New package name (excluding @internal prefix): my-package-name
```

## Installing a package into another
```
lerna add <source_package> --scope=<target_package>
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
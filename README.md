# Calendar Application
This is a simple calendar application built on React, NodeJs, Postgres, and Docker.

This project is an example of a kitchen sink implementation of CICD & development tools like Lerna(mono repo), Yarn workspaces(dependency management), Turbo repo(build order), Prettier(formatter), TypeScript typings, Mocha/Chai(unit testing), GitLab CICD pipelines, VS Code extensions, etc. 


# Commands

## Build
```
yarn turbo run build
```

## Creating a new package
```bash
yarn new
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
yarn graph
```

## Debugging
### **Web**
```
cd ./packages/web
yarn start
```
### **Server**
```
node ./packages/dist/main.js
```
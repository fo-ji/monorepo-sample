## ESLint
### client/tsconfig.json
```diff
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
+   "baseUrl": ".",
+   "paths": {
+     "@/*": ["src/*"]
+   }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

```zsh
$ docker-compose up -d
$ docker exec -it client sh
$ cd ..
$ yarn client eslint --init
$ yarn client add -D eslint-plugin-jsx-a11y eslint-plugin-react-hooks
```

```terminal
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config@0.4.1
Ok to proceed? (y) y
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard-with-typescript@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.0.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · yarn
Installing eslint-plugin-react@latest, eslint-config-standard-with-typescript@latest, @typescript-eslint/eslint-plugin@^5.0.0, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0, eslint-plugin-promise@^6.0.0, typescript@*
```

### client/eslintrc.json
```json
{
  "env": {
    "browser": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "standard-with-typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "tsconfigRootDir": ".",
    "project": ["./tsconfig.json"],
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "jsx-a11y",
    "react",
    "react-hooks"
  ],
  "rules": {
    "padding-line-between-statements": [
      "error", {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      }
    ],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": ["error"],
    "@typescript-eslint/no-misused-promises": [
      "error", {
        "checksVoidReturn": false
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/triple-slash-reference": [
      "error", {
        "types": "always"
      }
    ],
    "import/extensions": [
      "error", {
        "ignorePackages": true,
        "pattern": {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
        }
      }
    ],
    "import/order": [
      "error", {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "object",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "{react,react-dom/**}",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "{[A-Z]*,**/[A-Z]*}",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "./**.module.css",
            "group": "index",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": {
          "order": "asc"
        }
      }
    ],
    "react/display-name": "off"
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "react/prop-types": "off"
      }
    }
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```
### client/package.json
```diff
  …
  "scripts": {
    "dev": "next dev",
    "build": "next build",
+   "start": "next start -p 8080",
+   "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
+   "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
+   "preinstall": "npx typesync || :"
  },
  …
```

```zsh
$ touch client/.eslintignore
```
### client/.eslintignore
```
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
.*lintrc.json
```

```zsh
$ mkdir .vscode
$ touch .vscode/setting.json
```

### .vscode/setting.json
```json
{
  "eslint.workingDirectories": [ "./client", "./server" ]
}
```

### client/src/pages/index.tsx
```jsx
import type { NextPage } from 'next';

const Home: NextPage = () => <div>Home</div>;

export default Home;
```

### client/src/pages/_app.tsx
```jsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
```

## Prettier
```zsh
$ yarn client add -D eslint-config-prettier
```
### client/.eslintrc.json
```diff
  …
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "standard-with-typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
+   "prettier"
  ],
  …
```
```zsh
$ mv .prettierrc .prettierrc.json
```

### .prettierrc.json
```json
{
  "singleQuote": true,
  "endOfLine": "auto"
}
```

### check conflict
```zsh
$ yarn client eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'
```

### client/package.json
```diff
  …
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 8080",
    "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
+   "format": "prettier --write --loglevel=warn 'src/**/*.{js,jsx,ts,tsx,html,json,gql,graphql}'",
+   "fix": "npm run --silent format; npm run --silent lint:fix",
    "preinstall": "npx typesync || :"
  },
  …
```

### remove ESLint & TypeScript
```zsh
$ yarn client remove eslint typescript
```

### remove un-use dir/file
```
- client/src/api
- client/src/styles/Home.module.css
```

## Prisma
```zsh
$ docker-exec -it client sh
$ npx prisma init
$ cd ..
$ yarn client add @prisma/client
$ cd client
$ npx prisma db pull
$ npx prisma generate
```

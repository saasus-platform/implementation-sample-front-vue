# implementation-sample-front-vue

This is a SaaS implementation sample using the SaaSus SDK

## Run Vue.js Front

```
git clone git@github.com:saasus-platform/implementation-sample-front-vue.git
cd ./implementation-sample-front-vue
cp ./.env.example .env
```

```
vi .env

# Set Env for Redirect Login Page
# Get it in the SaaSus Admin Console
VITE_APP_LOGIN_URL=https://auth.xxxxxxxxxx.com
```

```
npm install
npm run dev
```

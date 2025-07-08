# install:
1) npx express-generator --no-view --git ./ //no view to ignore the frontend stuff
2) npm install --save-dev nodemon
3) npx eslint --init
4) npm install dotenv

# miscellaneous:
JWT: Jason web token

upstash: Upstash is a serverless data platform designed for developers building modern, distributed, and serverless applications 
(for email reminder)

arcjet: Arcjet is a developer-focused security SDK and cloud service that helps you protect your web apps with minimal effort 
(stop multiple request etc)

hostinger alternative: https://app.gitpod.io/onboarding/set-up-runner/remote/configure/0197ea10-9153-7631-b70e-0a9760cb64ed/install

dotenv: package that allows us to retrieve the environment variables

1) after express-generator: 1) delete bin public routes folders, and clean the app.js
2) after eslint it has some questions:
√ What do you want to lint? · javascript
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · no / yes
√ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm



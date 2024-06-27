#!/usr/bin/env node

const { program } = require('commander');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

program
    .version('1.0.0')
    .description('React Project Bootstrap CLI');

program
    .command('init <projectName>')
    .description('Initialize a new React project with Vite and Tailwind CSS')
    .action(async (projectName) => {
        const inquirer = await import('inquirer');

        const questions = [
            {
                type: 'confirm',
                name: 'redux',
                message: 'Do you want to include Redux for state management?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'router',
                message: 'Do you want to include React Router for routing?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'eslint',
                message: 'Do you want to include ESLint for code linting?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'prettier',
                message: 'Do you want to include Prettier for code formatting?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'testing',
                message: 'Do you want to include Jest and React Testing Library for testing?',
                default: true,
            }
        ];

        inquirer.default.prompt(questions).then((answers) => {
            // Run Vite create-react-app
            shell.exec(`npm create vite@latest ${projectName} -- --template react`);
            shell.cd(projectName);

            // Install Tailwind CSS
            shell.exec('npm install -D tailwindcss postcss autoprefixer');
            shell.exec('npx tailwindcss init -p');
            setupTailwindCSS();

            // Create directory structure
            createDirectoryStructure();

            if (answers.redux) {
                shell.exec('npm install redux react-redux');
                setupRedux();
            }

            if (answers.router) {
                shell.exec('npm install react-router-dom');
                setupRouter();
            }

            if (answers.eslint) {
                shell.exec('npm install -D eslint');
                setupEslint();
            }

            if (answers.prettier) {
                shell.exec('npm install -D prettier');
                setupPrettier();
            }

            if (answers.testing) {
                shell.exec('npm install -D jest @testing-library/react @testing-library/jest-dom');
                setupTesting();
            }

            console.log('Project setup complete!');
        });
    });

program.parse(process.argv);

function setupTailwindCSS() {
    const tailwindConfigContent = `
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
  `;
    fs.writeFileSync('tailwind.config.js', tailwindConfigContent);

    const tailwindCSSContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;
    fs.writeFileSync('src/index.css', tailwindCSSContent);
}

function createDirectoryStructure() {
    const directories = ['src/components', 'src/pages', 'src/contexts', 'src/utils', 'src/redux', 'src/routes', 'src/styles'];
    directories.forEach(dir => {
        shell.mkdir('-p', dir);
    });
}

function setupRedux() {
    const reduxDir = path.join(process.cwd(), 'src', 'redux');
    fs.writeFileSync(path.join(reduxDir, 'store.js'), reduxStoreContent);
}

function setupRouter() {
    const routesDir = path.join(process.cwd(), 'src', 'routes');
    fs.writeFileSync(path.join(routesDir, 'AppRouter.js'), routerContent);
}

function setupEslint() {
    fs.writeFileSync('.eslintrc.js', eslintConfigContent);
}

function setupPrettier() {
    fs.writeFileSync('.prettierrc', prettierConfigContent);
}

function setupTesting() {
    const testsDir = path.join(process.cwd(), 'src', '__tests__');
    shell.mkdir('-p', testsDir);
    fs.writeFileSync(path.join(testsDir, 'App.test.js'), testContent);
}

const reduxStoreContent = `
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  // your reducers
});

const store = createStore(rootReducer);

export default store;
`;

const routerContent = `
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default AppRouter;
`;

const eslintConfigContent = `
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Add your custom rules here
  },
};
`;

const prettierConfigContent = `
{
  "singleQuote": true,
  "trailingComma": "es5"
}
`;

const testContent = `
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders Home component', () => {
  render(<Home />);
  expect(screen.getByText('Home Page')).toBeInTheDocument();
});
`;

const envContent = `
REACT_APP_API_URL=http://localhost:3000/api
`;

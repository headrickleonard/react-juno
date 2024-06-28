#!/usr/bin/env node

import { program } from 'commander';
import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

program
  .version('1.0.0')
  .description('React Project Bootstrap CLI');

program
  .command('init <projectName>')
  .description('Initialize a new React project with Vite and Tailwind CSS')
  .action(async (projectName) => {
    const inquirer = (await import('inquirer')).default;

    const questions = [
      {
        type: 'list',
        name: 'template',
        message: 'Select a project template',
        choices: ['standard', 'e-commerce', 'blog', 'portfolio'],
      },
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

    const answers = await inquirer.prompt(questions);
    const spinner = ora();

    try {
      
      if (answers.template !== 'standard') {
        console.log(chalk.yellow('Notice: The selected template is not currently working. Please use the standard setup.'));
        const confirmation = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'useStandard',
            message: 'Would you like to proceed with the standard template?',
            default: true,
          }
        ]);

        if (!confirmation.useStandard) {
          console.log(chalk.red('Setup aborted. Please try again with the standard template.'));
          return;
        }

        answers.template = 'standard';
      }

      spinner.start('Creating Vite project');
      shell.exec(`npm create vite@latest ${projectName} -- --template react`, { silent: true });
      shell.cd(projectName);
      spinner.succeed('Vite project created');

      spinner.start('Installing Tailwind CSS');
      shell.exec('npm install -D tailwindcss postcss autoprefixer', { silent: true });
      shell.exec('npx tailwindcss init -p', { silent: true });
      setupTailwindCSS();
      spinner.succeed('Tailwind CSS installed');

      spinner.start('Creating directory structure');
      createDirectoryStructure();
      spinner.succeed('Directory structure created');

     

      if (answers.template !== 'standard') {
        spinner.start(`Copying ${answers.template} template files`);
        copyTemplateFiles(answers.template);
        spinner.succeed(`${answers.template} template files copied`);
      }

      if (answers.redux) {
        spinner.start('Installing Redux');
        shell.exec('npm install redux react-redux', { silent: true });
        setupRedux();
        spinner.succeed('Redux installed');
      }

      if (answers.router) {
        spinner.start('Installing React Router');
        shell.exec('npm install react-router-dom', { silent: true });
        setupRouter();
        spinner.succeed('React Router installed');
      }

      if (answers.eslint) {
        spinner.start('Setting up ESLint');
        shell.exec('npm install -D eslint', { silent: true });
        setupEslint();
        spinner.succeed('ESLint setup complete');
      }

      if (answers.prettier) {
        spinner.start('Setting up Prettier');
        shell.exec('npm install -D prettier', { silent: true });
        setupPrettier();
        spinner.succeed('Prettier setup complete');
      }

      if (answers.testing) {
        spinner.start('Setting up testing');
        shell.exec('npm install -D jest @testing-library/react @testing-library/jest-dom', { silent: true });
        setupTesting();
        spinner.succeed('Testing setup complete');
      }

      console.log(chalk.green('Project setup complete!'));
    } catch (error) {
      spinner.fail(chalk.red('An error occurred during project setup'));
      console.error(error);
    }
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

function copyTemplateFiles(template) {
  const templateDir = path.join(__dirname, 'templates', template);
  shell.cp('-R', `${templateDir}/*`, process.cwd());
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

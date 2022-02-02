#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import * as inquirer from 'inquirer';
import * as fse from 'fs-extra';
import { join } from 'path';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Which template do you want to use?',
      choices: ['vanilla', 'vanilla-ts'],
    },
  ])
  .then((answers) => {
    if (answers.template === 'vanilla') {
      fse.copySync(join(__dirname, 'template-vanilla'), process.cwd());
    } else if (answers.template === 'vanilla-ts') {
      fse.copySync(join(__dirname, 'template-vanilla-typescript'), process.cwd());
    }
  });

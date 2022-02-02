#!/usr/bin/env node

import * as fs from 'fs-extra';
import path from 'path';
import { CreateServer } from './server';

const cwd = process.cwd();

CreateServer();

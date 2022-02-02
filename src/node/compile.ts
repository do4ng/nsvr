/* eslint-disable import/no-extraneous-dependencies */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { compileString } from 'sass';
import * as ts from 'typescript';

export default function CompileCode(url: string, data: string): { code: string; type: string } {
  if (url.endsWith('.ts')) {
    let tsconfig = '{}';

    if (existsSync(join(process.cwd(), 'tsconfig.json'))) {
      tsconfig = readFileSync(join(process.cwd(), 'tsconfig.json')).toString();
    }
    const compiled = ts.transpileModule(data, JSON.parse(tsconfig)).outputText;

    // console.log(compiled);

    return { code: compiled, type: 'text/javascript' };
  }
  if (url.endsWith('.sass') || url.endsWith('.scss')) {
    const compiled = compileString(data).css;

    return { code: compiled, type: 'text/css' };
  }
  if (url.endsWith('.css')) {
    return { code: data, type: 'text/css' };
  }
  if (url.endsWith('.html')) {
    return { code: data, type: 'text/html' };
  }
  if (url.endsWith('.js')) {
    return { code: data, type: 'text/javascript' };
  }
  if (url.endsWith('.json')) {
    return { code: data, type: 'application/json' };
  }

  return { code: data, type: 'text/plain' };
}

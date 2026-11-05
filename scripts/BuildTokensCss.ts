// Writes dist/tokens.css: the design tokens as CSS custom properties for
// consumers without Material UI. Runs with Node's built-in type stripping.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  brandColors,
  colorSchemes,
  type ColorSchemeTokens,
} from '../src/tokens/ColorTokens.ts';
import { layout, radius, space } from '../src/tokens/LayoutTokens.ts';
import { fontFamilies } from '../src/tokens/TypographyTokens.ts';

const PREFIX = '--da';

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function flatten(
  value: object,
  path: string[] = [],
): [name: string, value: string][] {
  return Object.entries(value).flatMap(([key, entry]) =>
    typeof entry === 'object' && entry !== null
      ? flatten(entry as object, [...path, kebab(key)])
      : [[[...path, kebab(key)].join('-'), String(entry)]],
  );
}

function block(
  selector: string,
  declarations: [string, string][],
  indent = '',
) {
  const body = declarations
    .map(([name, value]) => `${indent}  ${name}: ${value};`)
    .join('\n');
  return `${indent}${selector} {\n${body}\n${indent}}`;
}

function colorDeclarations(tokens: ColorSchemeTokens): [string, string][] {
  return flatten(tokens).map(([name, value]) => [
    `${PREFIX}-color-${name}`,
    value,
  ]);
}

const staticDeclarations: [string, string][] = [
  ...flatten(brandColors).map(([name, value]): [string, string] => [
    `${PREFIX}-brand-${name}`,
    value,
  ]),
  [`${PREFIX}-font-sans`, fontFamilies.sans],
  [`${PREFIX}-font-mono`, fontFamilies.mono],
  ...Object.entries(radius).map(([name, value]): [string, string] => [
    `${PREFIX}-radius-${name}`,
    `${value}px`,
  ]),
  ...Object.entries(space).map(([name, value]): [string, string] => [
    `${PREFIX}-space-${name}`,
    `${value}px`,
  ]),
  ...Object.entries(layout).map(([name, value]): [string, string] => [
    `${PREFIX}-layout-${kebab(name)}`,
    `${value}px`,
  ]),
];

const css = [
  '/* @direktamt/ui-kit design tokens. Generated from src/tokens; do not edit. */',
  '/* Colour schemes follow the theme selectors: [data-light] and [data-dark] on <html>. */',
  block(':root', staticDeclarations),
  block(':root, [data-light]', [
    ['color-scheme', 'light'],
    ...colorDeclarations(colorSchemes.light),
  ]),
  block('[data-dark]', [
    ['color-scheme', 'dark'],
    ...colorDeclarations(colorSchemes.dark),
  ]),
  `@media (prefers-color-scheme: dark) {\n${block(
    ':root:not([data-light]):not([data-dark])',
    [['color-scheme', 'dark'], ...colorDeclarations(colorSchemes.dark)],
    '  ',
  )}\n}`,
  '',
].join('\n\n');

const target = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../dist/tokens.css',
);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, css);
console.log(`Wrote ${target}`);

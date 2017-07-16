/**
 * Created by WindomZ on 17-7-16.
 */

import test from 'ava';

import generateSvg from './badge';

test('badge invalid input', t => {
  t.is(generateSvg.size(''), 'unknown');
  t.is(generateSvg.size('1'), 'unknown');
  t.is(generateSvg.size(NaN), 'unknown');
  t.is(generateSvg.size(true), 'unknown');
  t.is(generateSvg.size(Infinity), 'unknown');
  t.is(generateSvg.size(-Infinity), 'unknown');
  t.is(generateSvg.size(null), 'unknown');
});

test('badge valid input', t => {
  t.is(generateSvg.size(0), '0 B');
  t.is(generateSvg.size(0.5), '0.5 B');
  t.is(generateSvg.size(10), '10 B');
  t.is(generateSvg.size(10.1), '10.1 B');
  t.is(generateSvg.size(999), '999 B');
  t.is(generateSvg.size(1001), '1 kB');
  t.is(generateSvg.size(1000 * 1000), '1 MB');
  t.is(generateSvg.size(1e16), '10 PB');
  t.is(generateSvg.size(1e30), '1000000 YB');
});

test('badge valid svg', t => {
  t.regex(generateSvg(0), /0 B/gi);
  t.regex(generateSvg(1001), /1 kB/gi);
});

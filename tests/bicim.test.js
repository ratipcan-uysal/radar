import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bicim } from '../src/bicim.js';

test('K25: tek ondalık, virgül, tam kesirle yarım yukarı yuvarlama', () => {
  for (const [pay, payda, beklenen] of [
    [5, 4, '1,3'], [124, 100, '1,2'], [7, 4, '1,8'], [199, 200, '1,0'],
    [0, 3, '0,0'], [6656, 29, '229,5'], [1005, 1000, '1,0'], [105, 100, '1,1'],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, '1,0'],
  ]) assert.equal(bicim(pay, payda), beklenen);
});

test('kesir dışındaki girdiler biçimlendirilmez', () => {
  for (const [pay, payda] of [[1, 0], [-1, 2], [1.25, 1], [1, 1.5], [Infinity, 1]]) {
    assert.throws(() => bicim(pay, payda), TypeError);
  }
});

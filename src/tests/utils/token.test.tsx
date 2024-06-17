import { assert, test } from 'vitest';

import { isTokenInfo, isTokenStore } from '../../utils/types';

const mockTokenStore = {
  token: 'mock_token',
  expirationTime: 1234567890,
};

const mockTokenInfo = {
  access_token: 'mock_access_token',
  scope: 'mock_scope',
  token_type: 'bearer',
  expires_in: 3600,
};

test('isTokenStore correctly identifies TokenStore', () => {
  assert.ok(isTokenStore(mockTokenStore), 'Expected mockTokenStore to be identified as TokenStore');
  assert.notOk(isTokenStore({}), 'Expected empty object to not be identified as TokenStore');
  assert.notOk(isTokenStore(null), 'Expected null to not be identified as TokenStore');
  assert.notOk(isTokenStore(undefined), 'Expected undefined to not be identified as TokenStore');
  assert.notOk(isTokenStore('string'), 'Expected string to not be identified as TokenStore');
});

test('isTokenInfo correctly identifies TokenInfo', () => {
  assert.ok(isTokenInfo(mockTokenInfo), 'Expected mockTokenInfo to be identified as TokenInfo');
  assert.notOk(isTokenInfo({}), 'Expected empty object to not be identified as TokenInfo');
  assert.notOk(isTokenInfo(null), 'Expected null to not be identified as TokenInfo');
  assert.notOk(isTokenInfo(undefined), 'Expected undefined to not be identified as TokenInfo');
  assert.notOk(isTokenInfo('string'), 'Expected string to not be identified as TokenInfo');
});

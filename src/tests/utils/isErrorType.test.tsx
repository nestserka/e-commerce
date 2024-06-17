import { assert, test } from 'vitest';

import { isErrorType } from '../../utils/types';

const mockHttpError = {
  statusCode: 404,
  message: 'Not Found',
  error: 'Resource not found'
};

test('isErrorType correctly identifies HttpError', () => {
  assert.ok(isErrorType(mockHttpError), 'Expected mockHttpError to be identified as HttpError');
  assert.notOk(isErrorType({}), 'Expected empty object to not be identified as HttpError');
  assert.notOk(isErrorType(null), 'Expected null to not be identified as HttpError');
  assert.notOk(isErrorType(undefined), 'Expected undefined to not be identified as HttpError');
  assert.notOk(isErrorType('string'), 'Expected string to not be identified as HttpError');
});

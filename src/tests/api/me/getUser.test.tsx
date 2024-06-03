import { describe, expect, it } from 'vitest';

import getUser from '../../../api/me/getUser';

describe('getUser', () => {
    it('should throw an error for missing refreshToken', async () => {
      let error: Error | undefined;

      try {
        await getUser();
      } catch (err) {
        error = err as Error;
      }

      expect(error).toBeDefined();

      if (error) {
        expect(error.message).toBe('Missing required option (refreshToken)');
      } else {
        expect(error).toBeDefined(); 
      }
    });
  });
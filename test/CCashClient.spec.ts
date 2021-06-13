import { CCashClient } from '@/CCashClient';

describe('CCashClient', () => {
  describe('constructor', () => {});

  describe('instance', () => {
    let client;

    beforeEach(() => {
      client = new CCashClient();
    });

    describe('balance', () => {
      it('returns an integer', async () => {
        expect(await client.balance('blinkblinko')).toEqual(10);
      });
    });
  });
});

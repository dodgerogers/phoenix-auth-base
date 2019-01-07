import moment from 'moment';
import * as SessionTimer from '../SessionTimer';


describe('SessionTimer', () => {
  const frozenTime = '2018-01-01';
  const oneMinInMs = 60000;
  const elevenMinutesInMs = 610000;

  let originalNow, originalUTC, expireAt;
  beforeEach(() => {
    originalNow = moment.now;
    originalUTC = moment.utc;

    moment.now = (time = frozenTime) => originalNow(time);
    moment.utc = (time = frozenTime, ...args) => originalUTC(time, ...args);

    expireAt = moment.utc().add(10, 'minutes').format();
  });

  afterEach(() => {
    moment.now = originalNow;
    moment.utc = originalUTC;
  });

  describe('refreshIn', () => {
    it('executes timerFn with expected args when current time is before the expiration window', () => {
      const executeBeforeExpirationInMs = oneMinInMs;

      const msToExecute = SessionTimer.refreshIn(expireAt, executeBeforeExpirationInMs);

      const nineMinutes = 540000
      expect(msToExecute).toEqual(nineMinutes);
    });

    it('executes callback when current time is in the expiration window', () => {
      const executeBeforeExpirationInMs = elevenMinutesInMs;

      const msToExecute = SessionTimer.refreshIn(expireAt, executeBeforeExpirationInMs);

      expect(msToExecute).toEqual(0);
    });
  });
});

import moment from 'moment';
import * as SessionTimer from '../SessionTimer';

jest.mock('moment', () => {
  const moment = require.requireActual('moment');
  return (time = '2018-01-01') => moment(time);
});


describe('SessionTimer', () => {
  const expireAt = moment().add(10, 'minutes').format();
  const oneMinInMs = 60000;
  const elevenMinutesInMs = 610000;

  describe('call', () => {
    it('executes timerFn with expected args when current time is outside the expiration window', () => {
      const expirationWindow = oneMinInMs;

      const msToExecute = SessionTimer.refreshIn(expireAt, expirationWindow);

      const nineMinutes = 540000
      expect(msToExecute).to.equal(nineMinutes);
    });

    it('executes callback when current time is within the expiration window', () => {
      const expirationWindow = elevenMinutesInMs;

      const msToExecute = SessionTimer.refreshIn(expireAt, expirationWindow);

      expect(msToExecute).to.equal(0);
    });
  });
});

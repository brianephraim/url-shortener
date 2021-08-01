import MockDate from 'mockdate';
import {act} from 'react-test-renderer';

const FRAME_TIME = 10;

global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME);
};
global.cancelAnimationFrame = () => null;

const advanceOneFrame = () => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
};

export const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  // Step through each of the frames until we've ran them all
  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed += 1;
  }
};

const setupTimeTravel = () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementationOnce(message => {
      if (!message.includes('useNativeDriver')) {
        global.console.warn(message);
      }
    });
    MockDate.set(0);
    jest.useFakeTimers('legacy');
  });
  afterEach(async () => {
    await act(async () => {
      jest.runAllTimers();
    });
  });
};

export default setupTimeTravel;

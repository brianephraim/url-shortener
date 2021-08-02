import MockDate from 'mockdate';

const originalSetTimeout = setTimeout;
export function detectFakeTimers() {
  return setTimeout !== originalSetTimeout;
}

export const FRAME_TIME = 10;

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

function setupSafeTimers() {
  beforeAll(() => {
    jest.spyOn(global.console, 'warn').mockImplementationOnce(message => {
      if (!message.includes('useNativeDriver')) {
        global.console.warn(message);
      }
    });
  });
  beforeEach(() => {
    MockDate.set(0);
    jest.useFakeTimers('legacy');
    global.requestAnimationFrame = cb => {
      setTimeout(cb, FRAME_TIME);
    };
    global.cancelAnimationFrame = () => null;
  });
  afterEach(async () => {
    if (detectFakeTimers()) {
      jest.runOnlyPendingTimers();
      jest.useRealTimers('legacy');
    }
  });
}

export default setupSafeTimers;

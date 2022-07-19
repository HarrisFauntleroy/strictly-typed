type LogType = 'info' | 'warn' | 'error' | 'trace' | 'debug';

export const isDev = process.env.NODE_ENV === 'development';

export const isClient: Window | undefined = globalThis.window;

// If client and in development environment
export const isDebug = () => isDev && isClient;

const logger = (() => {
  const customLogText = `%c ${isClient ? 'CLIENT' : 'SERVER'}:`;
  const print = (type: LogType, ...messages: unknown[]) => {
    // If logs enabled in .env or in development mode
    if (process.env.NEXT_PUBLIC_LOGS_ENABLED || isDev) {
      switch (type) {
        case 'info':
          console.info(
            customLogText,
            'background: #4299E1; color: #000000;',
            ...messages,
          );
          break;
        case 'warn':
          console.warn(
            customLogText,
            'background: #ED8936; color: #000000;',
            ...messages,
          );
          break;
        case 'error':
          console.error(
            customLogText,
            'background: #F56565; color: #000000;',
            ...messages,
          );
          break;
        case 'trace':
          console.trace(
            customLogText,
            'background: #A0AEC0; color: #000000;',
            ...messages,
          );
          break;
        case 'debug':
        default:
          console.log(
            customLogText,
            'background: #48BB78; color: #000000;',
            ...messages,
          );
      }
    }
  };

  return {
    debug: print.bind(null, 'debug'),
    info: print.bind(null, 'info'),
    warn: print.bind(null, 'warn'),
    error: print.bind(null, 'error'),
    trace: print.bind(null, 'trace'),
  };
})();

export default logger;

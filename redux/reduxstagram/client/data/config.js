import Raven from 'raven-js';

const sentry_key = 'dc96f6ec42394fe5a96db44f06e528fe';
const sentry_app = '78630';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
    Raven.captureException(ex, {
        extra: context
    });
    /*eslint no-console:0*/
    window && window.console && console.error && console.error(ex);
}


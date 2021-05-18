// noinspection JSValidateTypes

import createHistory from 'history/createHashHistory';

export default createHistory({ basename: process.env.PUBLIC_URL });

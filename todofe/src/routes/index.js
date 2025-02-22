import Home from '~/pages/Home/Home';
const { config } = require('./routes');

const publicRoutes = [{ path: config.routes.home, component: Home }];

export { publicRoutes };

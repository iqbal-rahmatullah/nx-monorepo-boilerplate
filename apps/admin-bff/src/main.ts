import { AppServer, config } from '@stores/shared';
import { errorGuard } from '@store/auth';
import authRouter from './routes/auth_route';
import postRouter from './routes/post_route';

const port = config.PORT_ADMIN_APP || 3000;
const host = process.env.HOST || 'localhost';
const prefixApi = `/api/admin/${config.API_VERSION}`;

const server = new AppServer(host, +port);

server.addRoute(`${prefixApi}/auth`, authRouter);
server.addRoute(`${prefixApi}/posts`, postRouter);
server.addGuard(errorGuard);

server.start();

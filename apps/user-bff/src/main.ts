import { AppServer, config } from '@stores/shared';
import { errorGuard } from '@store/auth';
import authRouter from './routes/auth_route';
import postRouter from './routes/post_route';
import userRoute from './routes/user_route';

const port = config.PORT_USER_APP || 3000;
const host = process.env.HOST || 'localhost';
const prefixApi = `/api/user/${config.API_VERSION}`;

const server = new AppServer(host, +port);

server.addRoute(`${prefixApi}/auth`, authRouter);
server.addRoute(`${prefixApi}/posts`, postRouter);
server.addRoute(`${prefixApi}/me`, userRoute);
server.addGuard(errorGuard);

server.start();

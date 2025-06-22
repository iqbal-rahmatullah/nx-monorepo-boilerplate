import { AppServer, config } from '@stores/shared';
import { errorGuard } from '@store/auth';
import authRouter from './routes/auth_route';

const port = config.PORT_USER_APP || 3000;
const host = process.env.HOST || 'localhost';

const server = new AppServer(host, +port);

server.addRoute('/api/user/v1', authRouter);
server.addGuard(errorGuard);

server.start();

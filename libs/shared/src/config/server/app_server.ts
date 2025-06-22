import express, { Application } from 'express';
import { ServerLogger } from '../../utils';
import cors from 'cors';

export class AppServer {
  private app: Application;
  private logger: ServerLogger;
  private host: string;
  private port: number;
  private routes: Array<{ path: string; router: express.Router }>;
  private guards: Array<express.RequestHandler> = [];

  constructor(host: string, port: number) {
    this.app = express();
    this.logger = new ServerLogger();
    this.host = host;
    this.port = port;
    this.routes = [];

    this.initializeGuards();
  }

  private initializeGuards() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.logger.stream());
    this.app.use(cors());
  }

  public addRoute(path: string, router: express.Router) {
    this.routes.push({ path, router });
  }

  private initializeRoutes() {
    this.routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public addGuard(guard) {
    this.guards.push(guard);
  }

  public initializeGuardsAdded() {
    this.guards.forEach((guard) => {
      this.app.use(guard);
    });
  }

  public start() {
    this.initializeRoutes();
    this.initializeGuardsAdded();

    this.app.listen(this.port, this.host, () => {
      this.logger.debug(
        `Server is running at http://${this.host}:${this.port}`
      );
    });
  }
}

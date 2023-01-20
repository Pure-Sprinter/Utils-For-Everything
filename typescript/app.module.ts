import { DataSource, DataSourceOptions } from "typeorm";
import express, { Router, Application } from "express";
import { Server } from "http";

interface AppConfig {
  options: DataSourceOptions;
  port: number;
  globalRouter: Router;
  controllers: Array<any>;
}

class AppModule {
  app: Application;
  private database: DataSource;
  private server: Server;
  private port: number;
  private globalRouter: Router;
  private controllers: Array<any>;

  constructor(appConfig: AppConfig) {
    const { options, port, globalRouter, controllers } = appConfig;
    this.app = express();
    this.database = new DataSource(options);
    this.port = port;
    this.globalRouter = globalRouter;
    this.controllers = controllers;
  }

  async listen() {
    await this.database.initialize();
    this.app.use("/", this.globalRouter);
    this.server = this.app.listen(this.port);
  }

  async close() {
    await this.database.destroy();
    this.server.close();
  }
}

export { AppModule };

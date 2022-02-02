export interface IndexConfig {
  main: string;
  target: string;
}

export interface Config {
  port?: number;
  index: IndexConfig;
}

export interface IMessage {
  code: string,
  level: Level;
  text?: string;
  timestamp?: Date;
}

export enum Level {
  PRIMARY,
  SUCCESS,
  WARNING,
  ERROR
}

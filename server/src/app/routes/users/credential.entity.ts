import { Column, ObjectIdColumn, Entity } from "typeorm";
import { ObjectID } from "mongodb";

@Entity('credentials')
export class Credential {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public userId: ObjectID;

  @Column()
  public password: string;
}
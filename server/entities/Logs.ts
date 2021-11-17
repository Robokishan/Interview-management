import {
  BaseEntity,
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Logs extends BaseEntity<Logs, "_id"> {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field(() => String)
  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property()
  interview_id!: string;

  @Field()
  @Property()
  student_id!: string;

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class Logs extends BaseEntity {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property()
  owner_id!: string;

  @Field()
  @Property()
  asset_id!: string;
}

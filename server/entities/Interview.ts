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
export class Interview extends BaseEntity<Interview, "_id"> {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property()
  ownerId!: string;

  @Field()
  @Property()
  title!: string;

  @Field()
  @Property()
  description!: string;

  @Field()
  @Property()
  experience!: string;

  @Field()
  @Property()
  position!: string;
}

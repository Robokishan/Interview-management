import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field(() => String)
  @SerializedPrimaryKey()
  id!: string;

  @Field(() => String)
  @Property()
  name!: string;

  @Field(() => String)
  @Unique()
  @Property()
  username!: string;

  @Field(() => String)
  @Unique()
  @Property()
  email!: string;

  @Field(() => String)
  @Property()
  password!: string;

  @Field({ nullable: true })
  @Property()
  details?: string;

  @Field(() => String)
  @Property()
  type!: ["student", "interviewer"];

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

@InputType()
export class RegistrationInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  details!: string;

  @Field(() => String)
  type!: ["student", "interviewer"];
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

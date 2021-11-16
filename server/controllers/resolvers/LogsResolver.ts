import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
// import { getMongoRepository } from "typeorm";
// import { formanswers } from "../../models/typeormEnt/v1/FormAns";
// import { Forms } from "../../models/typeormEnt/v1/Forms";
import { Context } from "../../types/Context";
import { ObjectID } from "mongodb";
import { Logs } from "../../entities/Logs";

@Resolver()
export class LogsResolver {
  @Authorized()
  @Query(() => [Logs])
  async answers(@Ctx() { req, res }: Context) {
    const userId = req.userId;

    // #1 : mongoose method
    // try {
    //   const assets = await Asset.find({ user_id: userId }).lean().exec();
    //   const ids = assets.map((asset) => asset._id);
    //   let answers = await Answer.find({ form_id: { $in: ids } })
    //     .lean()
    //     .exec();
    //   for (let answer of answers) {
    //     let asset = await Asset.findOne({
    //       user_id: userId,
    //       _id: answer.form_id,
    //     }).exec();
    //     answer["title"] = asset["title"];
    //     answer["description"] = asset["description"];
    //   }
    //   console.log(answers);
    //   return answers;
    // } catch (err) {
    //   console.error("Form Answer error", err);
    // }

    // #2 using mongorepository
    // found getMongomanager vs getMongoRepository

    // try {
    //   let assetManager = getMongoRepository(Forms);
    //   let answerManager = getMongoRepository(formanswers);

    //   const assets = await assetManager
    //     .aggregate([
    //       {
    //         $match: { user_id: userId },
    //       },
    //       {
    //         $addFields: {
    //           id: { $toString: "$_id" },
    //         },
    //       },
    //     ])
    //     .toArray();

    //   const ids = assets.map((asset) => asset.id);
    //   let answers = await answerManager.find({
    //     where: { form_id: { $in: ids } },
    //   });

    //   return answers;
    // } catch (error) {
    //   console.log("Error", error);
    // }
  }

  // There is a problem in this resolver
  // it does not gives multiple value like form and its answers usually
  // graphql does provide union type but i have to look into it

  @Authorized()
  @Query(() => Logs)
  async answer(
    @Arg("answerId") answerId: string,
    @Ctx() { req, res }: Context
  ) {
    // const userId = req.userId;
    // // let formsManager = await getMongoRepository(Forms);
    // let answerManager = await getMongoRepository(formanswers);
    // let answer = await answerManager.findOne({
    //   where: { _id: new ObjectID(answerId) },
    // });
    // // let asset = await formsManager.findOne({
    // //   where: {
    // //     user_id: userId,
    // //     _id: new ObjectID(answer.form_id),
    // //   },
    // // });
    // return answer;
  }

  // TODO: Untested code
  @Authorized()
  @Mutation(() => Logs)
  async deleteAnswer(
    @Arg("answerid") answerId: string,
    @Ctx() { req, res }: Context
  ) {
    // const userId = req.userId;
    // let answerManager = await getMongoRepository(formanswers);
    // let answer = await answerManager.findOne({
    //   where: { _id: new ObjectID(answerId) },
    // });
    // answerManager.findOneAndDelete({ where: { _id: new ObjectID(answerId) } });
    // return answer;
  }
}

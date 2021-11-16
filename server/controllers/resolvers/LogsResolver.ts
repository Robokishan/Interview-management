import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
// import { getMongoRepository } from "typeorm";
// import { formanswers } from "../../models/typeormEnt/v1/FormAns";
// import { Forms } from "../../models/typeormEnt/v1/Forms";
import { Context } from "../../types/Context";
import { ObjectID } from "mongodb";
import { Logs } from "../../entities/Logs";
import { Interview } from "../../entities/Interview";
import { User } from "../../entities/User";

@Resolver()
export class LogsResolver {
  @Authorized()
  @Query(() => [Logs])
  async IInterviewerLogsLists(@Ctx() { em, req, res }: Context) {
    const userId = req.userId;

    try {
      const interviewRepository = em.getRepository(Interview);
      const logRepository = em.getRepository(Logs);

      const interviews = await interviewRepository.aggregate([
        {
          $match: { owner_id: userId },
        },
        {
          $addFields: {
            id: { $toString: "$_id" },
          },
        },
      ]);

      const ids = interviews.map((asset) => asset.id);

      let logs = await logRepository.find({ interview_id: { $in: ids } });
      const studentIds = logs.map((_log) => _log.student_id);
      let students = await em
        .getRepository(User)
        .find({ id: { $in: studentIds } });

      const InterviewLogsList = logs.map((log) => {
        let _interview = interviews.filter(
          (interview) => interview.id == log.interview_id
        )[0];

        _interview = {
          ..._interview,
          student: students
            .filter((student) => student.id == log.student_id)[0]
            .toJSON(),
        };

        return _interview;
      });

      return logs;
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }

  // There is a problem in this resolver
  // it does not gives multiple value like form and its answers usually
  // graphql does provide union type but i have to look into it
  @Authorized()
  @Query(() => Logs)
  async IgetInterviewerLog(
    @Arg("id") id: string,
    @Ctx() { em, req, res }: Context
  ) {
    const userId = req.userId;
    // let formsManager = await getMongoRepository(Forms);
    let logRepository = await em.getRepository(Logs);
    let log = await logRepository.findOne({
      id,
    });

    // TODO : ALSO RETURN STUDENT DETAIL IN FUTURE
    return log;
  }

  // TODO: Untested code
  // REJECT FOR INTERVIEW
  @Authorized()
  @Mutation(() => Boolean)
  async IdeleteLog(@Arg("id") id: string, @Ctx() { em, req, res }: Context) {
    const log = await em.getRepository(Logs).findOneOrFail({ id });
    await em.getRepository(Logs).removeAndFlush(log);
    return true;
  }
}

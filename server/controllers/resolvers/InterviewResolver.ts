import { wrap } from "@mikro-orm/core";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import { Interview } from "../../entities/Interview";
import { Logs } from "../../entities/Logs";
import { Context } from "../../types/Context";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
@InputType()
class InterviewInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  experience: string;

  @Field()
  position!: string;
}

@Resolver()
export class InterviewResolver {
  // Interviewer List interviews their
  @Authorized()
  @Query(() => [Interview])
  async IInterviewList(@Ctx() { em, req, res }: Context) {
    const userId = req.userId;
    const interviewRepository = em.getRepository(Interview);
    return interviewRepository.find({
      owner_id: {
        $eq: userId,
      },
    });
  }

  @Authorized()
  @Query(() => [Interview])
  async SInterviewList(@Ctx() { em, req, res }: Context) {
    const userId = req.userId;
    const interviewRepository = em.getRepository(Interview);
    return interviewRepository.find({});
  }

  // Interviewer create interview
  @Authorized()
  @Mutation(() => Interview)
  async IcreateInterview(
    @Arg("options") options: InterviewInput,
    @Ctx() { em, req, res }: Context
  ) {
    const userId = req.userId;
    const interview = new Interview();
    wrap(interview).assign(options);
    interview.owner_id = userId;
    await em.getRepository(Interview).persistAndFlush(interview);
    return interview;
  }

  // Interviewer delete Interview
  @Authorized()
  @Mutation(() => Boolean)
  async IdeleteInterview(
    @Arg("id", () => String) id: string,
    @Ctx() { em, req, res }: Context
  ) {
    const interview = await em.getRepository(Interview).findOneOrFail({ id });
    await em.getRepository(Interview).removeAndFlush(interview);
    return true;
  }

  // student apply for interview
  @Authorized()
  @Mutation(() => Boolean)
  async SapplyForInterview(
    @Arg("interviewId", () => String) interviewId: string,
    @Ctx() { em, req, res }: Context
  ) {
    const student_id = req.userId;

    const log = new Logs();
    log.interview_id = interviewId;
    log.student_id = student_id;
    await em.getRepository(Logs).persistAndFlush(log);

    return true;
  }

  // student revoke interview
  @Authorized()
  @Mutation(() => Boolean)
  async SejectFromInterview(
    @Arg("id", () => String) id: string,
    @Ctx() { em, req, res }: Context
  ) {
    const interview = await em.getRepository(Interview).findOneOrFail({ id });
    await em.getRepository(Interview).removeAndFlush(interview);
    return true;
  }

  // view interview
  //future scope check access token is from student only currently this is open
  @Authorized()
  @Query(() => Interview)
  async SInterview(@Arg("id") id: string, @Ctx() { em, req, res }: Context) {
    const userId = req.userId;
    const interviewRepository = em.getRepository(Interview);
    return interviewRepository.findOne({
      id: id,
    });
  }

  // view interview
  @Authorized()
  @Query(() => Interview)
  async IInterview(@Arg("id") id: string, @Ctx() { em, req, res }: Context) {
    const userId = req.userId;
    const interviewRepository = em.getRepository(Interview);
    return interviewRepository.findOne({
      id: id,
      owner_id: userId
    });
  }
}

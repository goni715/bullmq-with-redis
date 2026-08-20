import { Queue } from "bullmq";

export const emailQueue = new Queue("email");

const addEmailJob = async () => {
  await emailQueue.add("send-email", { email: "gonidev715@gmail.com" });
  await emailQueue.add(
    "send-email",
    { email: "lerofam787@archifun.com" },
    { delay: 10_000 },
  );
};

export default addEmailJob;

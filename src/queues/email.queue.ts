import { Queue } from "bullmq";

export const emailQueue = new Queue("email");

const addEmailJob = async () => {
  await emailQueue.add("send-email", { email: "gonidev715@gmail.com" });
  await emailQueue.add(
    "send-email",
    { email: "goniosman715149123@gmail.com" },
    { delay: 60_000 }, //60 seconds
  );
};

export default addEmailJob;

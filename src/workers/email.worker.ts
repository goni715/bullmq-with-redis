import { Worker } from "bullmq";
import { connection } from "@/config/redis";
import sendEmail from "@/utils/sendEmail";

const worker = new Worker(
  "email",
  async (job) => {
    const { email } = job.data;
    console.log(`Sending email to ${email}`);
    await sendEmail(email);
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

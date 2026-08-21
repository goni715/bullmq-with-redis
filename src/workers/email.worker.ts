import { Worker } from "bullmq";
import { connection } from "@/config/redis";

const worker = new Worker(
  "email",
  async (job) => {
    console.log(job.data);
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

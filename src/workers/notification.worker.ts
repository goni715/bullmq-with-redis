import { Worker } from "bullmq";
import { connection } from "@/config/redis";

export const notificationWorker = new Worker(
  "notification",
  async (job) => {
    const { userId, message } = job.data;

    console.log(`Sending notification to user: ${userId}`);
    console.log(`Message: ${message}`);

    //send actual notification
    console.log("Notification sent successfully");
  },
  {
    connection,
  },
);

notificationWorker.on("completed", (job) => {
  console.log(`Notification job ${job.id} completed`);
});

notificationWorker.on("failed", (job, error) => {
  console.log(`Notification job ${job?.id} failed: ${error.message}`);
});

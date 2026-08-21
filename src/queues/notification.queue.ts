import { Queue } from "bullmq";
import { connection } from "@/config/redis";

export const notificationQueue = new Queue("notification", {
  connection,
});

const addNotificationJob = async (userId: string, message: string) => {
  await notificationQueue.add("send-notification", {
    userId,
    message,
  });
};

export default addNotificationJob;

import addEmailJob from "@/queues/email.queue";
import addNotificationJob from "@/queues/notification.queue";

const producer = async () => {
  await Promise.all([
    addEmailJob(),
    addNotificationJob("user-6585", "Welcome to our platform!"),
  ]);

  console.log("All jobs added successfully");
};

producer();

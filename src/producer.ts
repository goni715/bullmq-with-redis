import addEmailJob from "@/queues/email.queue";

const producer = async () => {
  await Promise.all([addEmailJob()]);

  console.log("All jobs added successfully");
};

producer();

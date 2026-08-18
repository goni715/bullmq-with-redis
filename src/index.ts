import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const myQueue = new Queue("foo");

async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" });
  await myQueue.add("myJobName", { qux: "baz" });

  console.log("Job added successfully");

  const counts = await myQueue.getJobCounts(
    "waiting",
    "active",
    "completed",
    "failed",
  );

  console.log(counts);
}

addJobs();

/*

const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  "foo",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
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

*/

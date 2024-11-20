const schedule = require("node-schedule");

// At a particular Date and time
/*const someDate = new Date("2024-05-26T12:34:56.789Z");
schedule.scheduleJob(someDate, () => {
  console.log("job ran @", new Date().toString());
});*/

// At recurrent interval
// schedule.scheduleJob("*/2 * * * * *", () => {
//   console.log("Hello");
// });

// cancel jon
schedule.scheduleJob("m-job", "*/2 * * * * *", () => {
  console.log("Hello");
  schedule.cancelJob("m-job");
});

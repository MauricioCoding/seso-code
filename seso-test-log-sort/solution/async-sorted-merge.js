"use strict";
const P = require("bluebird");
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allEntries = [];

      // I went ahead and collected all posible log to store them in memory.
      await P.all(
        logSources.map(async (source) => {
          let entry;
          while ((entry = await source.popAsync())) {
            allEntries.push(entry);
          }
        })
      );

      // This way the sort will be in memory and way faster
      allEntries.sort((a, b) => a.date - b.date);

      allEntries.forEach((entry) => {
        printer.print(entry);
      });

      // Resolve the promise once all logs are drained and printed
      resolve(console.log("Async call complete"));
    } catch (error) {
      // Reject the promise in case of an error
      reject(error);
    }
  });
};
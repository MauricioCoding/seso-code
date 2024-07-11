"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // Since this is a Sync funtion this is more straight foward and I just took all entries.
  function drainLogsSync(logSources) {
    let allEntries = [];

    logSources.forEach((source) => {
      let entry;
      while ((entry = source.pop())) {
        allEntries.push(entry);
      }
    });

    // Sort all entries by date
    allEntries.sort((a, b) => a.date - b.date);

    // Print all entries in sorted order
    allEntries.forEach((entry) => {
      printer.print(entry);
    });
  }

  // Call the drainLogsSync function with the provided log sources
  drainLogsSync(logSources);
  return (console.log("Sync call complete"))
};

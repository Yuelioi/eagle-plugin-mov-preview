const { exec } = require("child_process");
const path = require("path");

function openFileWithDefaultPlayer(filePath) {
  // Resolve the absolute path to the file
  const resolvedPath = path.resolve(filePath);

  // Determine the command based on the operating system
  let command;
  switch (process.platform) {
    case "win32":
      command = `start "" "${resolvedPath}"`;
      break;
    case "darwin":
      command = `open "${resolvedPath}"`;
      break;
    case "linux":
      command = `xdg-open "${resolvedPath}"`;
      break;
    default:
      console.error(`Unsupported platform: ${process.platform}`);
      return;
  }

  // Execute the command to open the file with the default application
  exec(command, (err) => {
    if (err) {
      console.error(`Error opening file: ${err.message}`);
    } else {
      console.log(`File opened: ${resolvedPath}`);
    }
  });
}

module.exports = openFileWithDefaultPlayer;

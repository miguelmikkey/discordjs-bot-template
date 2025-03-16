const fs = require("fs");
const path = require("path");

/*
 * This function performs a deep, recursive search within a specified directory,
 * applying a callback function to every JavaScript (.js) file it encounters.
 *
 * It uses fs.readdirSync with the option { withFileTypes: true } to retrieve detailed
 * information about each item in the directory. For each item, it checks whether it's a
 * directory or a file:
 *   - If it's a directory, the function calls itself recursively to continue the search.
 *   - If it's a .js file, the provided callback function is executed with the full path of the file.
 *
 * Parameters:
 *   dir (string): The root directory to begin the recursive traversal.
 *   callback (Function): A function that is invoked for each discovered .js file.
 */

const loadFiles = (dir, callback) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadFiles(fullPath, callback);
    } else if (file.name.endsWith(".js")) {
      callback(fullPath);
    }
  }
};

module.exports = { loadFiles };

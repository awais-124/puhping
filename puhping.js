// puhping.js

const VERSION = 0.1;
const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Read command-line arguments
const { argv } = require('node:process');

// If no args after `node puhping.js`, show manual
if (argv.length === 2) {
  console.log(
    `\x1b[34m********************** puhping.js v${VERSION} ***********************\x1b[0m`
  );
  console.log('Usage: node puhping.js [options] <file>');
  console.log('Options:');
  console.log('  -v, --version      Output the version number');
  console.log('  <file>             File to scan for URLs');
  return;
}

// If there's an argument supplied to the script, show either the version number or scan the file
if (argv.length === 3) {
  const argument = argv[2];

  switch (argument) {
    // See if they're checking for the version
    case '-v':
    case '--version':
      console.log(`v${VERSION}`);
      break;
    default:
      scanFile(argv[2]); // Assume that this is a file meant to be read.
      break;
  }
}

function scanFile(file) {
  const filepath = path.resolve(file);

  if (!fs.existsSync(filepath)) {
    console.error(`Error: File not found - ${filepath}`);
    return;
  }

  const urls = new Set();
  const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    output: process.stdout,
    terminal: false,
  });

  // Regular expression to find URLs
  const urlRegex = /(https?:\/\/[^\s,"')]+)/g;

  rl.on('line', (line) => {
    const matches = line.match(urlRegex);
    if (matches) {
      matches.forEach((url) => urls.add(url));
    }
  });

  rl.on('close', async () => {
    console.log(`Found ${urls.size} unique URLs:`);

    let count = 1;

    //* How to change the colour of your node.js console output
    //* https://blog.logrocket.com/using-console-colors-node-js/

    for (const url of urls) {
      try {
        const response = await axios.get(url);
        // Green text for successful status
        console.log(
          `${count}. \x1b[34m${url}\x1b[0m - \x1b[32mStatus: ${response.status}\x1b[0m`
        );
      } catch (error) {
        // Check if the error has a response and status code
        if (error.response) {
          // Red text for errors with status code
          console.log(
            `${count}. \x1b[34m${url}\x1b[0m - \x1b[31mStatus: ${error.response.status} | Error: ${error.message}\x1b[0m`
          );
        } else {
          // Red text for errors without a status code
          console.log(
            `${count}. \x1b[34m${url}\x1b[0m - \x1b[31mError: ${error.message}\x1b[0m`
          );
        }
      }
      ++count;
    }
  });
}

// puhpingasync.js
const VERSION = 0.1;
const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// https://github.com/yargs/yargs
// const { argv } = require('yargs');

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
    case '-v':
    case '--version':
      console.log(`v${VERSION}`);
      break;
    default:
      scanFile(argv[2]);
      break;
  }
}

function scanFile(file) {
  // Check if we have internet before bothering to ping.

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

  const urlRegex = /(https?:\/\/[^\s,"')]+)/g;

  rl.on('line', (line) => {
    const matches = line.match(urlRegex);
    if (matches) {
      matches.forEach((url) => urls.add(url));
    }
  });

  rl.on('close', async () => {
    console.log(`Found ${urls.size} unique URLs:`);

    const promises = Array.from(urls).map((url, index) =>
      checkUrl(url, index + 1)
    );

    await Promise.all(promises);

    console.log('All URLs have been checked.');
  });
}

async function checkUrl(url, count) {
  try {
    const response = await axios.get(url);
    console.log(
      `${count}. \x1b[34m${url}\x1b[0m - \x1b[32mStatus: ${response.status}\x1b[0m`
    );
  } catch (error) {
    if (error.response) {
      console.log(
        `${count}. \x1b[34m${url}\x1b[0m - \x1b[31mStatus: ${error.response.status} | Error: ${error.message}\x1b[0m`
      );
    } else {
      console.log(
        `${count}. \x1b[34m${url}\x1b[0m - \x1b[31mError: ${error.message}\x1b[0m`
      );
    }
  }
}

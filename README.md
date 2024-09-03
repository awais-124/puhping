# puhping.js

## Table of Contents

1. [What is puhping.js?][1-table-of-contents]
2. [Installation][2-installation]
3. [Using puhping.js][3-using-puhpingjs]
4. [Contribute to puhping.js][4-contributing-to-puhpingjs]

## 1. What is puhping.js?

`puhping.js` is a command-line tool written in JavaScript that lets you scan a file for any `dead links` that begin with `http` or `https`.

## 2. Installation

1. To use `puhping.js`, first install [`node`](https://nodejs.org/en/download/package-manager) onto your Operating System.
2. Download or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository to your computer.
3. Navigate into the `puhping` folder.
4. Open your terminal and run `npm i` to install all of `puhping.js`'s dependencies.

## 3. Using puhping.js

After [following the installation steps][2-installation], simply do the following to check for dead links in a file:

1. Paste the file you want to check in you `puhping` folder.
2. Run `node puhping FILE_NAME`.

The result should look something like this:

```sh
node puhping node_modules/axios/CHANGELOG.md
```

Found 497 unique URLs:

1. <span style="color: blue;">https://github.com/axios/axios/compare/v1.7.3...v1.7.4</span> - <span style="color: green;">Status: 200</span>
2. <span style="color: blue;">https://github.com/axios/axios/issues/6539</span> - <span style="color: green;">Status: 200</span>
3. <span style="color: blue;">https://github.com/axios/axios/issues/6543</span> - <span style="color: green;">Status: 200</span>
4. <span style="color: blue;">https://github.com/axios/axios/commit/6b6b605eaf73852fb2dae033f1e786155959de3a</span> - <span style="color: green;">Status: 200</span>
5. <span style="color: blue;">https://github.com/axios/axios/commit/07a661a2a6b9092c4aa640dcc7f724ec5e65bdda</span> - <span style="color: green;">Status: 200</span>
6. <span style="color: blue;">https://avatars.githubusercontent.com/u/31389480?v&#x3D;4&amp;s&#x3D;18</span> - <span style="color: green;">Status: 200</span>
7. <span style="color: blue;">https://github.com/levpachmanov</span> - <span style="color: green;">Status: 200</span>
8. <span style="color: blue;">https://avatars.githubusercontent.com/u/41283691?v&#x3D;4&amp;s&#x3D;18</span> - <span style="color: green;">Status: 200</span>
9. <span style="color: blue;">https://github.com/hainenber</span> - <span style="color: green;">Status: 200</span>
10. <span style="color: blue;">https://github.com/axios/axios/compare/v1.7.2...v1.7.3</span> - <span style="color: green;">Status: 200</span>

## 4. Contributing to puhping.js

To contribute to this project, please follow the instructions found in [CONTRIBUTING.md](./CONTRIBUTING.md)

[Back to top][top]

[1-table-of-contents]: #1-what-is-puhpingjs
[2-installation]: #2-installation
[3-using-puhpingjs]: #3-using-puhpingjs
[4-contributing-to-puhpingjs]: #4-contributing-to-puhpingjs
[top]: #puhpingjs

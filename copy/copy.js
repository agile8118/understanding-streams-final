const { pipeline } = require("node:stream");
const fs = require("node:fs/promises");

// File Size Copied: 1 GB
// Memory Usage: 1 GB
// Execution Time: 900 ms
// Maximum File Size Able to Copy: 2 GB
// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("text-big.txt");

//   await destFile.write(result);

//   console.timeEnd("copy");
// })();

// File Size Copied: 1 GB
// Memory Usage: 30 MB
// Execution Time: 2 s
// Maximum File Size Able to Copy: No Limit
// (async () => {
//   console.time("copy");

//   const srcFile = await fs.open("text-gigantic.txt", "r");
//   const destFile = await fs.open("text-copy.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== readResult.buffer.length) {
//       // we have some null bytes, remove them at the end of the returned buffer
//       // and then write to our file
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd("copy");
// })();

// File Size Copied: 1 GB
// Memory Usage: 30 MB
// Execution Time: 1 s
// Maximum File Size Able to Copy: No Limit
(async () => {
  console.time("copy");

  const srcFile = await fs.open("text-big.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.unpipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.on("end", () => {
  //   console.timeEnd("copy");
  // });

  // Don't use pipe in production, use pipeline instead! It will automatically
  // handle the cleanings for you and give you an easy way for error handling
  pipeline(readStream, writeStream, (err) => {
    console.log(err);
    console.timeEnd("copy");
  });
})();

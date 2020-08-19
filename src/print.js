const fs = require('fs');
const path = require('path');
const printer = require('pdf-to-printer');
const fetch = require('node-fetch');

function print(request, response) {
  function onSuccess() {
    console.log('printed successfully!');
    response.send({ status: 'completed' });
  }

  function onError(error) {
    console.log(`error: ${error}`);
    response.send({ status: 'error', error });
  }

  console.log('fetching from URL...');

  fetch(request.query.url)
    .then((res) => res.buffer())
    .then((buffer) => {
      const pdf = 'TestDocument.pdf'; // to print from local file system. delete the fetch code and substitute the const pdf with this line of code
      // const pdf = save(buffer);
      console.log('printing pdf file...');
      printer
        .print(pdf)
        .then(onSuccess)
        .catch(onError)
        .finally(() => remove(pdf));
    });
}

function save(buffer) {
  const pdfPath = path.join(__dirname, './' + randomString() + '.pdf');
  fs.writeFileSync(pdfPath, buffer, 'binary');
  return pdfPath;
}

function remove(pdf) {
  fs.unlinkSync(pdf);
}

function randomString() {
  return Math.random().toString(36).substring(7);
}

module.exports = print;

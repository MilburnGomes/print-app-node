const fs = require('fs');
const path = require('path');
const printer = require('pdf-to-printer');
const fetch = require('node-fetch');

function print(request, response) {
  console.log(
    `filename: ${request.query.filename}, printer: ${request.query.printer}`
  );
  function onSuccess() {
    console.log('printed successfully!');
    response.send({ status: 'completed' });
  }

  function onError(error) {
    console.log(`error: ${error}`);
    response.send({ status: 'error', error });
  }

  const pdf = request.query.filename;
  // const pdf = save(buffer);
  const options = {
    printer: request.query.printer,
    win32: ['-print-settings "fit"'],
  };
  console.log('printing pdf file...');
  printer.print(pdf, options).then(onSuccess).catch(onError);
  // .finally(() => remove(pdf));
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

const fs = require('fs');
const { Writable, Readable } = require('stream');

module.exports = function(response, options) {
  if (!response) {
    throw new Error('Response argument missed');
  }

  if (! (response instanceof Writable) && ! (response instanceof Readable)) {
    throw new Error('Response streamable object should be passed');
  }

  if (!options || !options.filePath) {
    throw new Error('filePath option should be assigned');
  }

  const filePath = options.filePath;
  const removeCallback = function (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  const callback = options.callback || removeCallback;
  const stream = fs.createReadStream(filePath);

  stream.once('end', function () {
    stream.destroy(); // make sure stream closed, not close if download aborted.
    callback(filePath);
  }).pipe(response);
};
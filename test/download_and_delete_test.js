const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');
const mock = require('mock-fs');
const expressFilePipe = require('../lib');

describe('work tests', function () {
  let res =  new Writable();

  it('should download and remove file', function() {
    const filePath = path.join(__dirname, '/data/file1.txt');
    const file = {};
    file[filePath] = 'some content';
    mock(file);

    expressFilePipe(res, {
      filePath
    });

    assert.strictEqual(fs.existsSync(filePath), true);
    mock.restore();
  });
});

describe('failure tests', function () {
  let res =  new Writable();

  it('should drop error - missing filePath option', function() {
    try {
      expressFilePipe(res);
    } catch (err) {
     assert.strictEqual(err.message, 'filePath option should be assigned');
    }
  });

  it('should drop error - missing response argument', function() {
    try {
      expressFilePipe();
    } catch (err) {
      assert.strictEqual(err.message, 'Response argument missed');
    }
  });

  it('should drop error - response should be Stream', function() {
    const filePath = path.join(__dirname, '/data/file1.txt');
    res = {};

    try {
      expressFilePipe(res, { filePath });
    } catch (err) {
      assert.strictEqual(err.message, 'Response streamable object should be passed');
    }
  });
});
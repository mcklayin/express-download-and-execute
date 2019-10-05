# express-response-and-pipe
Helper that can pipe passed file and execute callback after file piped.

### Install
`npm install express-response-and-pipe`

#### Where to use
When you need to download file and remove him after downloading.


### Express Usage


```
const express = require('express);
const expressPipe = require('express-response-and-pipe');
app = express();

app.use(function(req, res, next) {
    const options = {
      filePath: '/path/to/file'
      callback: 'some callback function' // default is delete file callback
    };
    // File will be downloaded and callback will be fired
    expressPipe(res, options);
});
```





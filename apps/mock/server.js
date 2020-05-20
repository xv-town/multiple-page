const express = require('express');
const app = express();

// 配置Mock数据
const fs = require('fs');

app.get('*', function(req, res) {
  const file = `./get${req.params[0]}.json`
  fs.readFile(file, function(err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});
app.post('*', function(req, res) {
  const file = `./post${req.params[0]}.json`
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  fs.readFile(file, function(err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// 监听端口
app.listen('3737', function () {
  console.log('localhost:3737');
});

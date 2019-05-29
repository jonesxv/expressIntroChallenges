var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.post('/create/:name/:age', function(req, res) {
  const obj = {
    name: req.params.name,
    age: req.params.age
  };
  fs.readFile('./storage.json', function (err, data) {
    let json = [];
    if (data.length > 0) {
      json = JSON.parse(data);
    }
    obj.id = json.length + 1;
    json.push(obj);
    fs.writeFileSync("./storage.json", JSON.stringify(json));
  });
  res.sendStatus(200);
});

app.get('/', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function (err, data) {
    if (data.length > 0) {
      const json = JSON.parse(data);
      res.json(json);
    } else {
      res.sendStatus(400);
    }
    // res.json(json);
  });  
});

app.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  fs.readFile('./storage.json', 'utf-8', function(err, data) {
    if (data.length > 0) {
      const json = JSON.parse(data);
      const result = json.filter(person => {
        return person.id === id;
      })
      if (result.length > 0) {
        res.json(result);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400)
    }
  });
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

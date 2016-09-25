var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('/risks.html');
});

app.get('/api/risks', function (req, res) {
  res.json({
    risks: [
      { desc: "big risk" },
      { desc: "little risk" }
    ]
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000 ...');
});

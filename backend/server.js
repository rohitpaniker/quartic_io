'strict on';

var express = require('express');
var bodyParser = require('body-parser');
var io = require('socket.io')();
var prompt = require('prompt'), arr = [];

var port = process.env.PORT || 5000;

var cors = require('cors');

var app = express();

app.use(cors());

app.set(port);

var APIDataObj = {
  statsOverview: [
    {
      'type': 'assignedTask', data: {'name': 'Assigned Task', 'count': 56}
    },
    {
      'type': 'reminders', data: {'name': 'Reminders', 'count': 4}
    },
    {
      'type': 'notifications', data: {'name': 'Notifications', 'count': 20}
    },
  ],
  data: [
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'assignedTask', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'reminders', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
    {type: 'notifications', msg: 'Oliver has assigned the interview Book Travel task to you.', href:'https://www.google.com'},
  ]
}


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var tempObj = {}

io.on('connection', (client) => {
  console.log('\r\nclient has connected');
  getUserInput('Please enter an option for the below task:\r\n 1. Assigned Task \r\n 2. Reminder \r\n 3. Notification \r\n Your input: ', function(input) {
    // {'type': 'assignedTask', msg: 'Rohit has assigned you a task', url: 'https://wwww.gmail.com'}
    console.log(parseInt(input));
    switch(parseInt(input)) {
      case 1:
        tempObj['type'] = 'assignedTask';
        getUserInput('Please enter a notification message: ', function(notifInput) {
          tempObj['msg'] = notifInput;
          getUserInput('Please enter a url to access the notification: ', function(urlInput) {
            tempObj['url'] = urlInput;
            console.log(tempObj)
            client.emit('notif', tempObj);
          });
        });
        break;
      case 2:
        tempObj['type'] = 'reminders';
        getUserInput('Please enter a notification message: ', function(notifInput) {
          tempObj['msg'] = notifInput;
          getUserInput('Please enter a url to access the notification: ', function(urlInput) {
            tempObj['url'] = urlInput;
            console.log(tempObj)
            client.emit('notif', tempObj);
          });
        });
        break;
      case 3:
        tempObj['type'] = 'notifications';
        getUserInput('Please enter a notification message: ', function(notifInput) {
          tempObj['msg'] = notifInput;
          getUserInput('Please enter a url to access the notification: ', function(urlInput) {
            tempObj['url'] = urlInput;
            console.log(tempObj)
            client.emit('notif', tempObj);
          });
        });
        break;
      default:
        break;
    }
  });
  // getUserInput('Please enter a notification message: ', function(notifInput) {
  //   tempObj['msg'] = notifInput;
  // });
  // getUserInput('Please enter a url to access the notification: ', function(urlInput) {
  //   tempObj['url'] = urlInput;
  // });
  // console.log(tempObj);
  // process.exit();
  // client.on('notif', () => {
  //   console.log('client has requested new data. Sending out!');
  //   client.emit('notif', APIDataObj);
  // });
});


function getUserInput(question, cb) {
  var stdin = process.stdin,
      stdout = process.stdout;

  stdin.resume();
  stdout.write(question);

  stdin.once('data', function(data) {
    cb(data.toString().trim());
  });
}


app.get('/', function(req, res){
  res.json('To access data, visit: http://localhost:5000/getNotifJSon');
})

app.get('/getNotifJSon', function(req, res){
  res.json(APIDataObj)
});

io.listen(4000);

app.listen(5000, function(){
  console.log('server is listening on port', port);
});

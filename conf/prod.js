require('./server.js')({ 
  input: '/home/ubuntu/michaelnisi',
  output: '/var/www/michaelnisi',
  port: '80',
  hook: '/publish',
  callback: function (err) {
    console.log(err || 'OK');
  } 
});

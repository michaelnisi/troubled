require('./server.js')({ 
  input: '/users/michael/workspace/michaelnisi',
  output: '/users/michael/workspace/website',
  ip: '127.0.0.1',
  port: '8888',
  hook: '/publish',
  callback: function (err) {
    console.log(err || 'OK');
  }
});

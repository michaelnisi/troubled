require('./server.js')({ 
  input:'/users/ubuntu/michaelnisi',
  output:'/var/www/michaelnisi',
  port:'80',
  callback: function (err) {
    console.log(err || 'OK');
  } 
});

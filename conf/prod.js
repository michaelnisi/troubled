require('./server.js')({ 
  input: '/home/ubuntu/michaelnisi'
, output: '/var/www/michaelnisi'
, port: '80'
, hook: '/publish'
, addresses: ['207.97.227.253', '50.57.128.197', '108.171.174.178']
, callback: function (err) {
    console.log(err || 'OK')
  } 
})

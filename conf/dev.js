require('./server.js')({ 
  input: '/users/michael/workspace/michaelnisi'
, output: '/tmp/michaelnisi-site'
, ip: 'localhost'
, port: '8888'
, hook: '/publish'
, addresses: ['127.0.0.1']
, callback: function (err) {
    console.log(err || 'OK')
  }
})

const {runner} = require('mocha-headless-chrome');

const options = {
  file: 'http://localhost:5678', // this URL plust this runner.js is the only way I can get this to run
  reporter: 'dot',               
  width: 800,                    
  height: 600,                   
  timeout: 120000,               
  visible: true                  // show chrome window
};

runner(options)
  .then(result => {
    let json = JSON.stringify(result);
    //console.log(json);
});

const nodemailer = require('nodemailer');
//const smtpTransport1 = require("nodemailer-smtp-transport");
const config = require('./package.json');

var smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: config.user,
        pass: config.pass
      },
      tls : {
      	rejectUnauthorized : false
      }
});

var send = function(mailOptions){
	smtpTransport.sendMail(mailOptions, function(error, response) {
	    if (error) {
	        console.log(error);
	    } else {
	        console.log(response);
	    }
	});
}

var close = function(){
	smtpTransport.close();
};


module.exports.send = send; 
module.exports.close = close;

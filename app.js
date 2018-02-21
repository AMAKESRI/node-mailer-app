const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const nodeMailer = require('./node-mailer');

const config = require('./package.json');



const app = express();



// engine setup
app.engine('handlebars' , exphbs());
app.set('view engine' , 'handlebars');

// bodyparser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//static folder
app.use('/public' , express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
	res.render('contact');
});

app.post('/send' , (req, res)=> {
	const output = `
	   <p>You have a new contact request :</p>
	   <h3>Contact details</h3>
	   <ul>
	   		<li>Name : ${req.body.name}</li>
	   		<li>Company : ${req.body.company}</li>
	   		<li>email : ${req.body.email}</li>
	   		<li>phone : ${req.body.phone}</li>
	   </ul>
	   <h3>Message : </h3>
	   <p>${req.body.message}</p>
	`;

    var mailOptions = {
        from: config.user,
        to: "mouhssineassaoud@gmail.com",
        subject: "Hello",
        html: output
    };

    nodeMailer.send(mailOptions);
});

app.listen(3000, ()=> {
	console.log('Server started...');
});


// http://codeforces.com/contests/220672

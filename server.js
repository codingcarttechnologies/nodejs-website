var express = require('express');
var app = express();
var path = require('path');
var bodyparser =require('body-parser');
var nodemailer = require("nodemailer");


app.use(express.static(__dirname + '/assets'));

app.all ('/', function(req, res) {
                        
            res.sendFile(path.join(__dirname+'/one-page.html'));
});
 
 app.all ('/blog', function(req, res) {
                        
            res.sendFile(path.join(__dirname+'/blog.html'));
});




 /*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "cct.hemantkota@gmail.com",
        pass: "Admin@123#"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

 
app.listen(4000, function(){
	console.log('Server running on' + 4000);

});

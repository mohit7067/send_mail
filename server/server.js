const express = require('express')

const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer');


app.use(express.json())

const corsOptions = {
    origin: [
      "http://localhost:3000",
    ],
    credentials: true, 
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  
  app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/", (req, res) => {
    res.send("homepage !");
  });
  
app.use(cors())


app.post("/send_mail",async(req,res)=>{
    const {name,email,message}= req.body
    try {

        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mohitpatil7067@gmail.com',
            pass: 'mdujyxecdphqzxfx',
        },
        });

        const emailContent = `
            <h1>Hello! ${name}</h1>
            <p>Your query for [ ${message} ] has been registered we will get back to you ASAP!</p>
            <h5>Thank you ! </h5>
        `;

        const mailOptions = {
            from: 'mohitpatil70672gmail.com',
            to: email,
            subject: "You query has been registered ",
            html: emailContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send("something went wrong!")
        } else {
            console.log('Email sent:', info.response);
            res.status(201).send("email has been sent !")
        }
        });
         
    } catch (error) {
       console.log(error)   
    }
})



app.listen(9090,()=>{
    console.log("listening on port 9090")
})
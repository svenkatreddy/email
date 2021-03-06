require('dotenv').config();
var express = require('express');
const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).max(60).required(),
});

const bodyParser = require('body-parser');
var sendEmail = require('./send-mail');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

  
app.post('/email', async (req, res) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    console.error(error);
    return res.status(400).send('invalid request');
  }
  await sendEmail(req.body.email);
  return res.status(200).send("done")
});

app.all('*', (req, res) => {
  console.log(req.originalUrl);
  return res.status(404).send();
})
  
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 
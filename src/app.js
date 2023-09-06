const  express = require('express')
require("./db/conn");
const User = require("./models/usermessage")
const app = express();
const path = require("path")
const hbs = require('hbs')
const port = process.env.PORT || 3000

const staticpath = path.join(__dirname,"../public")
const templatePath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.urlencoded({extended:false}))
//middleware
app.use(express.static(staticpath))
hbs.registerPartials(partialsPath)
app.set('views',templatePath)
app.set("view engine",'hbs')

app.get('/',(req,res)=>{
      res.render("index")
})
app.get('/about',(req,res)=>{
      res.render("about")
})
app.get('/gallery',(req,res)=>{
      res.render("gallery")
})
app.get('/service',(req,res)=>{
      res.render("service")
})

app.post("/contact",async (req,res)=>{
      try {
      //      res.send(req.body)
      const userData = new User(req.body);
      await userData.save();
      res.status(201).render("index");
      } catch (error) {
            res.status(500).send(error)
      }
})
app.listen(port,()=>{
      console.log("server running on port : ",port)
})
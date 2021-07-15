const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./config/db.config.js');

const User = db.User;
const Salon = db.Salon;
const Request = db.Request;
const Category = db.Category;
const Rate = db.Rate;

let router = require('./routers/userRouter.js');
let salonrouter = require('./routers/salonRouter.js');
let requestrouter = require('./routers/requestRouter.js');
let categoryrouter = require('./routers/categoryRouter.js');
let raterouter = require('./routers/rateRouter.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);
app.use('/', salonrouter);
app.use('/', requestrouter);
app.use('/', categoryrouter);
app.use('/', raterouter);


const server = app.listen(8090, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  User.sync().then(() => {
    const users = [
      { name: 'Admin', phone: '0247586952', 
                email: 'admin123@gmail.com' , password: 'admin123', role: '1'},
      { name: 'Saara', phone: '01245869532', 
                email: 'sara@gmail.com' , password: 'sara123', role: '0'},
      { name: 'Lilly', phone: '0147582413', 
                email: 'lilly@gmail.com' , password: 'lilly123', role: '0'}
    
    ]
    
    for(let i=0; i<users.length; i++){
      User.create(users[i]);
    }
  })
}); 

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Salon.sync().then(() => {
    const salons = [
      { salonname: 'Liya', ownership: 'Tinu', 
                phone: 0811111111 , address: ' 291 A9, Kandy 20000', location: 'Kandy'},
      { salonname: 'Lilly', ownership: 'Stephany', 
                phone: 0112222222 , address: '551 2nd Kurana, Negombo-Colombo Main Rd, Negombo 11500' , location: 'Colombo'},
      { salonname: 'Ashi', ownership: 'Bonny', 
                phone: 0553333333 , address: 'Lower St, Badulla' , location: 'Badulla'}
    ]
    
    for(let i=0; i<salons.length; i++){
      Salon.create(salons[i]);
    }
  })
}); 

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Request.sync().then(() => {
    const requests = [
      { sender: 'C.Anika', title: 'New branch opened for salon Lilly', 
                  description: 'The newly opened branch of Lilly Salon is located in 14A Sunethradevi Rd, Baththaramulla. Every sector of the main branch is available in this salon too. Within first two weeks customers may have an offer of 20% discounts on specified features.'},
      { sender: 'M.L.Lucy (Chief Executive of Salon Liya)', title: 'Change of the current ownership in salon Liya', 
                  description:'Salon Danis and Salon Liya are going to work as a group of salons by giving the semi ownership to Davis as well. Considerable provements will be added on the bottom of this description.'},
      { sender: 'Sera Fernando', title: 'Name replacement on salon Ashi', 
                  description: 'With attaching a new show view for the salon Ashi the name is replaced as Ashish. All the proving details will be attached here.'}
    ]
    
    for(let i=0; i<requests.length; i++){
      Request.create(requests[i]);
    }
  })
}); 

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Category.sync().then(() => {
    const categories = [
      { catname: 'Bridal Dresser'},
      { catname: 'Bridal Shop'},
      { catname: 'Ladies Salon'}
    ]
    
    for(let i=0; i<categories.length; i++){
      Category.create(categories[i]);
    }
  })
}); 

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Rate.sync().then(() => {
    const rate = [
      { rvalue: '5'},
      { rvalue: '3'},
      { rvalue: '4'}
    ]
    
    for(let i=0; i<rate.length; i++){
      Rate.create(rate[i]);
    }
  })
}); 



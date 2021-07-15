const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db.config.js');
const User = db.User;

exports.createUser = (req, res) => {
    let user = {};

    try{
        
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.password = req.body.password;
    
        User.create(user, 
                          {attributes: ['id', 'name', 'phone', 'email', 'password', "role"]})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "User Creation Failed!!",
            error: error.message
        });
    }
}

exports.users = (req, res) => {
     
    try{
        User.findAll({attributes: ['id', 'name', 'phone', 'email', 'password', 'role']})
        .then(users => {
            res.status(200).json(users);
        })

    }catch(error) {
        
        console.log(error);

        res.status(500).json({
            message: "Error While Retreiving User Details!!",
            error: error
        });
    }
}

exports.getUser = (req, res) => {
    User.findByPk(req.params.id, 
                        {attributes: ['id', 'name', 'phone', 'email', 'password', 'role']})
        .then(user => {
          res.status(200).json(user);
        }).catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error! Cannot get User!!",
              error: error
          });
        })
}

exports.updateUser = async (req, res) => {
    try{
        let user = await User.findByPk(req.body.id);
    
        if(!user){
            res.status(404).json({
                message: "User Not Found for Updating!!",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
            }
            let result = await User.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'name', 'phone', 'email', 'password', 'role']
                              }
                            );
                           

            if(!result) {
                res.status(500).json({
                    message: "Error -> Cannot Update the User!!",
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Successfully Updated the User!!"});
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Cannot Update the User!!",
            error: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if(!user){
            res.status(404).json({
                message: "Does Not Exist the User!!",
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Successfully Deleted the User!!"});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Cannot Delete the User!!",
            error: error.message
        });
    }
}
const { request } = require('express');
const db = require('../config/db.config.js');
const Request = db.Request;

exports.createRequest = (req, res) => {
    let request = {};

    try{
        
        request.sender = req.body.sender;
        request.title = req.body.title;
        request.description = req.body.description;
        
        Request.create(request, 
                          {attributes: ['id', 'sender', 'title', 'description']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Request Sending Failed!!",
            error: error.message
        });
    }
}

exports.requests = (req, res) => {
     
    try{
        Request.findAll({attributes: ['id', 'sender', 'title', 'description']})
        .then(requests => {
            res.status(200).json(requests);
        })

    }catch(error) {
        
        console.log(error);

        res.status(500).json({
            message: "Error While Retreiving Request Details!!",
            error: error
        });
    }
}

exports.getRequest = (req, res) => {
    Request.findByPk(req.params.id, 
                        {attributes: ['id', 'sender', 'title', 'description']})
        .then(request => {
          res.status(200).json(request);
        }).catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error! Cannot get Request!!",
              error: error
          });
        })
}

exports.updateRequest = async (req, res) => {
    try{
        let request = await Request.findByPk(req.body.id);
    
        if(!request){
            res.status(404).json({
                message: "The Request is Not Found for Updating!!",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                sender: req.body.sender,
                title: req.body.title,
                description: req.body.description
            
            }
            let result = await Request.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'sender', 'title', 'description']
                              }
                            );
                           

            if(!result) {
                res.status(500).json({
                    message: "Error -> Cannot Update the Request!!",
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "The Request Successfullu updated!!"});
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Cannot Update the Request!!",
            error: error.message
        });
    }
}

exports.deleteRequest = async (req, res) => {
    try{
        let requestId = req.params.id;
        let request = await Request.findByPk(requestId);

        if(!request){
            res.status(404).json({
                message: "Does Not Exist a Request!!",
                error: "404",
            });
        } else {
            await request.destroy();
            res.status(200).json({
                message: "The Request Successfully Deleted!!"});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Cannot Delete the Request!!",
            error: error.message
        });
    }
}
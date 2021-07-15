const db = require('../config/db.config.js');
const Rate = db.Rate;

exports.createRate = (req, res) => {
    let rate = {};

    try{
        
        rate.rvalue = req.body.rvalue;
            
        Rate.create(rate, 
                          {attributes: ['id', 'rvalue']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Rate Sending Failed!!",
            error: error.message
        });
    }
}

exports.rates = (req, res) => {
     
    try{
        Rate.findAll({attributes: ['id', 'rvalue']})
        .then(rates => {
            res.status(200).json(rates);
        })

    }catch(error) {
        
        console.log(error);

        res.status(500).json({
            message: "Error While Retreiving Rates!!",
            error: error
        });
    }
}

exports.getRate = (req, res) => {
    Rate.findByPk(req.params.id, 
                        {attributes: ['id', 'rvalue']})
        .then(rate => {
          res.status(200).json(rate);
        }).catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error! Cannot Get the Rate!!",
              error: error
          });
        })
}

exports.updateRate = async (req, res) => {
    try{
        let rate = await Rate.findByPk(req.body.id);
    
        if(!rate){
            res.status(404).json({
                message: "Rate, Not Found for Updating!!",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                rvalue: req.body.rvalue
                
            }
            let result = await Rate.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'rvalue']
                              }
                            );
                           

            if(!result) {
                res.status(500).json({
                    message: "Error -> Cannot Update the Rate!!",
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Successfullu updated the rate!!"});
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Cannot Update the Rate!!",
            error: error.message
        });
    }
}

exports.deleteRate = async (req, res) => {
    try{
        let rateId = req.params.id;
        let rate = await Rate.findByPk(rateId);

        if(!rate){
            res.status(404).json({
                message: "Does Not Exist the Rate!!",
                error: "404",
            });
        } else {
            await rate.destroy();
            res.status(200).json({
                message: "Successfully Deleted the Rate!!"});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Cannot Delete the Rate!!",
            error: error.message
        });
    }
}
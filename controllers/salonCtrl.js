const db = require('../config/db.config.js');
const Salon = db.Salon;

exports.createSalon = (req, res) => {
    let salon = {};

    try{
        
        salon.salonname = req.body.salonname;
        salon.ownership = req.body.ownership;
        salon.phone = req.body.phone;
        salon.address = req.body.address;
        salon.location = req.body.location;
    
        Salon.create(salon, 
                          {attributes: ['id', 'salonname', 'ownership', 'phone', 'address', "location"]})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Salon Listing Failed!!",
            error: error.message
        });
    }
}

exports.salons = (req, res) => {
     
    try{
        Salon.findAll({attributes: ['id', 'salonname', 'ownership', 'phone', 'address', 'location']})
        .then(salons => {
            res.status(200).json(salons);
        })

    }catch(error) {
        
        console.log(error);

        res.status(500).json({
            message: "Error While Retreiving Listed Salon Details!!",
            error: error
        });
    }
}

exports.getSalon = (req, res) => {
    Salon.findByPk(req.params.id, 
                        {attributes: ['id', 'salonname', 'ownership', 'phone', 'address', 'location']})
        .then(salon => {
          res.status(200).json(salon);
        }).catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error! Cannot get Salon Details!!",
              error: error
          });
        })
}

exports.updateSalon = async (req, res) => {
    try{
        let salon = await Salon.findByPk(req.body.id);
    
        if(!salon){
            res.status(404).json({
                message: "Salon, Not Found for Updating!!",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                salonname: req.body.salonname,
                ownership: req.body.ownership,
                phone: req.body.phone,
                address: req.body.address,
                location: req.body.location
            }
            let result = await Salon.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'salonname', 'ownership', 'phone', 'address', 'location']
                              }
                            );
                           

            if(!result) {
                res.status(500).json({
                    message: "Error -> Cannot Update the Salon!!",
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Successfully Updated the Salon!!"});
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Cannot Update the Salon!!",
            error: error.message
        });
    }
}

exports.deleteSalon = async (req, res) => {
    try{
        let salonId = req.params.id;
        let salon = await Salon.findByPk(salonId);

        if(!salon){
            res.status(404).json({
                message: "Does Not Exist the Salon!!",
                error: "404",
            });
        } else {
            await salon.destroy();
            res.status(200).json({
                message: "The Salon Successfully deleted!!"});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Cannot Delete the Salon!!",
            error: error.message
        });
    }
}
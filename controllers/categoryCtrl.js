const db = require('../config/db.config.js');
const Category = db.Category;

exports.createCategory = (req, res) => {
    let category = {};

    try{
        
        category.catname = req.body.catname;
            
        Category.create(category, 
                          {attributes: ['id', 'catname']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Category Creation Failed!!",
            error: error.message
        });
    }
}

exports.categories = (req, res) => {
     
    try{
        Category.findAll({attributes: ['id', 'catname']})
        .then(categories => {
            res.status(200).json(categories);
        })

    }catch(error) {
        
        console.log(error);

        res.status(500).json({
            message: "Error While Retreiving Categories!!",
            error: error
        });
    }
}

exports.getCategory = (req, res) => {
    Category.findByPk(req.params.id, 
                        {attributes: ['id', 'catname']})
        .then(category => {
          res.status(200).json(category);
        }).catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error! Cannot Get Category!!",
              error: error
          });
        })
}

exports.updateCategory = async (req, res) => {
    try{
        let category = await Category.findByPk(req.body.id);
    
        if(!category){
            res.status(404).json({
                message: "Category Not Found for Updating!!",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                catname: req.body.catname
                
            }
            let result = await Category.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'catname']
                              }
                            );
                           

            if(!result) {
                res.status(500).json({
                    message: "Error -> Cannot Update this Category!!",
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Category Successfully Updated!!"});
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Cannot Update the Category!!",
            error: error.message
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        let categoryId = req.params.id;
        let category = await Category.findByPk(categoryId);

        if(!category){
            res.status(404).json({
                message: "Does Not exist this Category!!",
                error: "404",
            });
        } else {
            await category.destroy();
            res.status(200).json({
                message: "Category Successfully Deleted!!"});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT Delete the Category!!",
            error: error.message
        });
    }
}
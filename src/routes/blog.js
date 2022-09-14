const router = require('express').Router();
const { required } = require('joi');
const Blog = require('../models/Blog')


const bodyParser = require('body-parser');

// Your routing code goes here

router.use(bodyParser());


router.get('/blog', async(req,res)=>{

    try {
        const data = await Blog.find({
            topic: req.query.search
        }).limit(req.query.page*5)
        if (data.length > 0) {return res.status(200).json({

            status: "success",
            result: data
        })};
        return res.status(200).send("No topic found");
      } catch (error) {
        return res.send(error.message);
      }

});

router.post("/blog", async (req, res) => {
  
    const topic = req.body.topic;
;
    try {

      const exestingData = await Blog.findOne({ topic: topic });
      if (exestingData) 
      {
        return res.send("Topic is already in Database");
      }
      else{
        
        const data = await Blog.insertMany(req.body);

        if (data) {return res.send({
            
            status: "success",
            result: data
        })}
        else{
            return res.send("Data is nt correct")
        };
    }
    } catch (error) {
      return res.send(error.message);
    }
  });


  router.put("/blog/:id", async (req, res) => {
  
    try {

      const exestingData = await Blog.findOne({_id:req.params.id });
      if (!exestingData) 
      {
        return res.send("insert correct id")
    }else
    {

        await Blog.updateOne({_id:req.params.id},req.body);

        const data = await Blog.find({_id:req.params.id});

        return res.json({
          status: "success",
          result: data
        });
      

    }
    
    } catch (error)
     {
      return res.send(error.message);
    }
  });

router.delete("/blog/:id", async (req, res) => {
  
    try {

      const exestingData = await Blog.findOne({_id:req.params.id });
      if (!exestingData) 
      {
        return res.send("insert correct id")
    }else
    {
         const data =  await Blog.deleteOne({_id:req.params.id});
        
        return res.json({
          status: "success",
          result: data
        });
      

    }
    
    } catch (error)
     {
      return res.send(error.message);
    }
  });

  
module.exports = router;
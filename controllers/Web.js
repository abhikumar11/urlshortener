const e = require("express");
const Weburl =require("../models/weburl");
const shortid = require('shortid')

module.exports.generate = async(req, res) => {
    if (req.isAuthenticated()) {
         try {
            const {oldlink} = req.body;
           
            if(!oldlink) return res.staus(404).json({error:"url required"});
            let exist= await Weburl.findOne({
                "urls.user":req.user.id
            })
            if(exist){
                const obj={user:req.user.id,oldweburl:oldlink}
                await Weburl.updateOne({$push: {urls: obj }});
            }
            else{
                const obj={user:req.user.id,oldweburl:oldlink}
                await Weburl.create( {urls: obj});
            }
            const data=await Weburl.findOne({"urls.user":req.user.id}).populate("urls");
             
                //console.log(data.urls);  

              
            return res.render('home',{
                title:"Home",
                data:data.urls
            });
            
         } catch (err) {
            console.log(err);
        return res.redirect('back');
         }
    }
    return res.render("signin.ejs");
};
module.exports.getLink = async(req, res) => {
    if (req.isAuthenticated()) {
         try {
            const {webdomain} = req.params;
            console.log("webdomain: ", webdomain);
            const data=await Weburl.find({newweburl:webdomain});
            console.log("data: ", data);
         } catch (err) {

         }
        }
};

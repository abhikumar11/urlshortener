const Weburl = require('../models/weburl');

module.exports.home= async function(req,res){
    try {
        if(req.isAuthenticated()){
            const data=await Weburl.findOne({"urls.user":req.user.id}).populate("urls");
            console.log("user: ",req.user.id);   
            //console.log(data);
                
            return res.render('home',{
                title:"Home",
                data:data.urls
            });
        }
            else{
                return res.redirect('/');
            }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
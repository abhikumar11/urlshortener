const User =require("../models/user");
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
         return res.redirect("/home");
    }
    return res.render("signin.ejs");
};
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
         return res.redirect("/home");
    }
    return res.render("signup.ejs");
};
module.exports.create = async (req, res) => {
    try {
         const {email, password } = req.body;
         User.findOne({ email:email },async (err, user) => {
              if (err) {
                   console.log("Error in finding user in signing up",err);
                   return;
              }

              if (!user) {
                   await User.create(
                        {
                             email,
                             password,
                        }).then(
                        (err, user) => {
                             if (err) {
                                  console.log("Couldn't sign Up",err);
                             }
                             return res.redirect("/");
                        }
                   );
              } else {
                   console.log("error", "Email already registed!");
                   return res.redirect("back");
              }
         });
    } catch (err) {
         console.log(err);
    }
};
module.exports.createSession = (req, res) => {
     
    return res.redirect("/home");
};

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
         if (err) {
              return next(err);
         }
         return res.redirect("/");
    });
};
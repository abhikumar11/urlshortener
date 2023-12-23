const mongoose = require("mongoose");
const shortid = require("shortid");

const webUrlSchema = new mongoose.Schema(
     {
          urls: [
               {
                    user: {
                         type: mongoose.Schema.Types.ObjectId,
                         ref: "User",
                    },
                    oldweburl: {
                         type: "string",
                    },
                    newweburl: {
                         type: "string",
                         default:shortid.generate
                    },
               },
          ],
     },
     { timestamps: true }
);
const Weburl = new mongoose.model("Weburl", webUrlSchema);

module.exports = Weburl;

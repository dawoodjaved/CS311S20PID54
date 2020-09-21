const mongoose = require("mongoose");
const URL =
  "mongodb+srv://dawood_javeed:dawood443@aoaproject.4rjiy.gcp.mongodb.net/ActivityScheduling?retryWrites=true&w=majority";

//in order to remove both two deprication warnings we have to use more other two arguments
//with connect  useNewUrlParser and useUnifiedTopology
//also use useFindAndModify:true, useCreateIndex:true to remove depricating warnings
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error) => {
    if (!error) {
      console.log("Mongodb connection succeeded");
    } else {
      console.log(
        "Error while connecting Mongodb " + JSON.stringify(error, undefined, 2)
      );
    }
  }
);

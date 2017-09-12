// bring in dependencies
const mongoose = require("mongoose");
// create a schema
var db = require('./')

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  driver: {
    ref: "Driver",
    type: mongoose.Schema.Types.ObjectId
  }
});

carSchema.pre('remove', function(next){
  var self = this;
  db.Driver.findById(this.driver)
    .then(function(driver){
    driver.cars.remove(self.id)
    driver.save()
      .then(function(e){
        next();
      })
  })
})

// create a model
const Car = mongoose.model("Car", carSchema);

// export the model
module.exports = Car;

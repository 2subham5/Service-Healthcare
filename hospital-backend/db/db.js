const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String,
            required: true},
    username: {type:String,
                require: true},
    password: {type:String,
        require: true},
        patien: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Patient'
        }]
  
});

const adminSchema = new mongoose.Schema({
    name: {type:String,
        required: true},
    username: {type:String,
        required: true},
    password:{type:String,
        required: true}
});
const employeeSchema = new mongoose.Schema({
    name: {type:String,
        required: true
    },
    designation: {type: String,
        required: true
    }
})
const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    guardian:{
        type: String,
        // required: true
    },
    gender:{
        type: String,
        required: true
    },
    patientCurrentCondition: {
        type: String,
        required: true
    },
   patientPastHistory:{
         type: String,
         
   },
   purchased: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
}]

    
  });
  const hospitalSchema = new mongoose.Schema({
    name: {type:String,
        required: true
          },
    address: {
        type: String,
        required: true
    },
   
    purchased: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    }]
  })
  const doctorSchema = new mongoose.Schema({
    doctorName: {type:String,
        required: true
          },
          degree : {type:String,
            required: true
              },
    reg: {type:String,
        required: true
          },
    category:{type:String,
        required: true
          },
          imgLink :{
            type: String,   
        },
          purchased: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Patient'
        }]
  })


const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Hospital = mongoose.model('Hospital', hospitalSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = {
    User,
    Admin,
    Doctor,
    Hospital,
    Patient,
    Employee
}
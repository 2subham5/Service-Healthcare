const express = require('express');
const {  Admin, Doctor, Hospital, Patient,Employee  } = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminSecret } = require("../middleware/auth");
const { authenticateAdminJwt } = require("../middleware/auth"); // Importing authenticateJwt middleware

const router = express.Router();


router.get('/me', authenticateAdminJwt, async (req, res) => {
    try {
        console.log(req);
        if (!req.user) {
            // Handle case where req.user is undefined or does not have username
            res.status(403).json({ message: "User not authenticated" });
            return;
        }

        // Find the admin by username asynchronously
        const admin = await Admin.findOne({ username: req.user.username });

        if (!admin) {
            // Handle case where admin with the provided username does not exist
            res.status(403).json({ message: "Admin not found" });
            return;
        }

        // Send the name of the found admin as JSON response
        res.json({ name: admin.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.post('/signup', async(req, res) => {
    const { username, password,name } = req.body;
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: "Admin already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({ name,username, password:hashedPassword });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, adminSecret, { expiresIn: '1h' });
        res.json({ message: "Admin created", token });
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            const token = jwt.sign({ username, role: 'admin' },adminSecret, { expiresIn: '1h' });
            res.json({ message: "Logged in", token });
        } else {
            res.status(403).json({ message: "Authentication failed" });
        }
    } else {
        res.status(403).json({ message: "Authentication failed" });
    }
});

//to post  available doctor
router.post('/doctor', authenticateAdminJwt, async(req, res) => {
try{
    const doctor = new Doctor(req.body);
    await doctor.save();
    // doctorId is var which stores animal id
    res.json({ message: "Doctor added successfully", docId: doctor.id });
}
catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
    
});
// to post hospital
router.post('/hospital', authenticateAdminJwt, async(req, res) => {
    try{
        const hospital = new Hospital(req.body);
        await hospital.save();
        // hospitalId is var which stores animal id
        res.json({ message: "Hospital added successfully", hospitalId: hospital.id });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
        
    });
    // to post patient
    router.post('/patient', authenticateAdminJwt, async(req, res) => {
        try{
            const patient = new Patient(req.body);
            await patient.save();
            // patientId is var which stores animal id
            res.json({ message: "Patient added successfully", patientId: patient.id });
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
            
        });
// to view 
router.get('/hospitals', authenticateAdminJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const hospitals = await Hospital.find({});
        res.json(hospitals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// delete hospital

router.delete('/hospital/:hospitalId', authenticateAdminJwt, async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        const hospital = await Hospital.findById(hospitalId);
        
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        await Hospital.findByIdAndDelete(hospitalId);
        
        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/patient/:patientId', authenticateAdminJwt, async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const patient = await Patient.findById(patientId);
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        await Patient.findByIdAndDelete(patientId);
        
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/employee/:employeeId', authenticateAdminJwt, async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const employee = await Employee.findById(employeeId);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await Employee.findByIdAndDelete(employeeId);
        
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/patients', authenticateAdminJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/doctors', authenticateAdminJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/doctor/:docId", authenticateAdminJwt, async(req,res)=>{
    try{
    const docId = req.params.docId;
    const doctor = await Doctor.findById(docId);
    // console.log(doctor);
    res.json({doctor})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
router.get("/hospital/:hospitalId", authenticateAdminJwt, async(req,res)=>{
    try{
    const hospitalId = req.params.hospitalId;
    const hospital = await Hospital.findById(hospitalId);
    // console.log(hospital);
    res.json({hospital})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
router.get("/patient/:PatientId", authenticateAdminJwt, async(req,res)=>{
    try{
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    // console.log(patient);
    res.json({patient})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
// add employee

router.post("/employee", authenticateAdminJwt, async(req,res)=>{
    try{
        const employee = new Employee(req.body);
        await employee.save();
        res.json({msg:"Employee added", employeeId:employee.id})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.get('/employees', authenticateAdminJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/employee/:employeeId", authenticateAdminJwt, async(req,res)=>{
    try{
    const employeeId = req.params.employeeId;
    const employee = await Employee.findById(employeeId);
    // console.log(employee);
    res.json({employee})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
// update
router.put('/employee/:employeeId', authenticateAdminJwt, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, { new: true });
        if (employee) {
            res.status(200).json({ message: "Updated", employee });
        } else {
            res.status(404).json({ message: "Doctor doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update doctor" });
    }
});
// update routes
router.put('/hospital/:hospitalId', authenticateAdminJwt, async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.hospitalId, req.body, { new: true });
        if (hospital) {
            res.status(200).json({ message: "Updated", hospital });
        } else {
            res.status(404).json({ message: "Hospital doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update hospital" });
    }
});

// patient
router.put('/patient/:patientId', authenticateAdminJwt, async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, { new: true });
        if (patient) {
            res.status(200).json({ message: "Updated", patient });
        } else {
            res.status(404).json({ message: "Patient doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update patient" });
    }
});
// doctor 
router.put('/doctor/:doctorId', authenticateAdminJwt, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true });
        if (doctor) {
            res.status(200).json({ message: "Updated", doctor });
        } else {
            res.status(404).json({ message: "Doctor doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update doctor" });
    }
});
// to add a particular doctor in a hospital
router.put('/hospital/:hospitalId/adddoctor', authenticateAdminJwt, async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital doesn't exist" });
        }

        // Assuming req.body.doctorId contains the ID of the doctor to be added
        const doctor = await Doctor.findById(req.body.doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor doesn't exist" });
        }

        // Add doctor to the hospital's purchased doctors array
        hospital.purchased.push(doctor._id);
        await hospital.save();

        res.status(200).json({ message: "Doctor added to hospital", hospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add doctor to hospital" });
    }
});

module.exports = router;



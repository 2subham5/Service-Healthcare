
const express = require('express');
const {User, Hospital, Doctor, Patient,} = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {userSecret} = require("../middleware/auth")
const {authenticateUserJwt} = require("../middleware/auth");

const router = express.Router();

router.get('/me', authenticateUserJwt, async (req, res) => {
    try {
        console.log(req);
        if (!req.user) {
            // Handle case where req.user is undefined or does not have username
            res.status(403).json({ message: "User not authenticated" });
            return;
        }

        // Find the admin by username asynchronously
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
            // Handle case where admin with the provided username does not exist
            res.status(403).json({ message: "User not found" });
            return;
        }

        // Send the name of the found admin as JSON response
        res.json({ name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/signup', async(req, res) => {
    const { username, password,name } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: "User already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ username, password:hashedPassword,name});
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, userSecret, { expiresIn: '1h' });
        res.json({ message: "User created", token });
    }
});

// router.post('/login', async(req, res) => {
//     const { username, password } = req.headers;

//     const user = await User.findOne({username,password});
//     if (user) {
//         const passwordMatch = await bcrypt.compare(password, existingUser.password);
//         if(passwordMatch){
//         const token = jwt.sign({username,role:'user'}, SECRET, {expiresIn:'1h'})
//         res.status(400).json({ message: "logged in", token });
//         }
//     }
// })
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(403).json({ message: "Authentication failed" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(403).json({ message: "Authentication failed" });
            return;
        }

        const token = jwt.sign({ username, role: 'user' }, userSecret, { expiresIn: '1h' });
        res.json({ message: "Logged in", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
    // to post patient
    router.post('/patient', authenticateUserJwt, async(req, res) => {
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
// to view available services
router.get('/hospitals', authenticateUserJwt, async(req,res)=>{
    try{
    const hospitals = await Hospital.find({});
    res.json({hospitals});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/patients', authenticateUserJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/doctors', authenticateUserJwt, async (req, res) => {
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// to view a particular service
router.get("/hospital/:hosptialId", authenticateUserJwt, async(req,res)=>{
    try{
    const hospitalId = req.params.hosptialId;
    const hospital = await Hospital.findById(hospitalId);
    // console.log(hospital);
    res.json({hospital})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
router.get("/doctor/:doctorId", authenticateUserJwt, async(req,res)=>{
    try{
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);
    // console.log(hospital);
    res.json({doctor})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})
router.get("/patient/:patientId", authenticateUserJwt, async(req,res)=>{
    try{
    const  patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    // console.log(hospital);
    res.json({patient})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed"})
    }
})

router.post('/doctor/:doctorId', authenticateUserJwt, async(req,res)=>{
    try{
    const doctor = await Doctor.findById(req.params.doctorId);
    if(doctor){
        const user = await User.findOne({username: req.user.username});
        if(user){
            if (user.purchased.includes(doctor._id) ) {
                return res.json({ message: "Already Subscribed" });
            }
    
            user.purchased.push(doctor._id);
            await user.save();
            res.json({message: "Appointment taken"});
        }
        else{
            res.status(403).json({message:"User not found"});
        }
    }
    else{
        res.status(404).json({message: "Doctor not found"});
    }
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
});

router.get('/appointment', authenticateUserJwt, async (req, res) => {
    try {
        // Find the user by username from the JWT payload and populate the purchasedCourses field
        const user = await User.findOne({ username: req.user.username }).populate('purchased');
        
        // Send the user data in the response
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports= router;
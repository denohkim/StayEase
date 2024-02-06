const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");

const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const User = require("../models/User");
// Welcome Page
router.get("/", (req, res) => res.render("index"));

// Student Dashboard
router.get("/student-dashboard", ensureAuthenticated, async (req, res) => {
    const numHostels = await Hostel.countDocuments({});
    const numRooms = await Room.countDocuments({isAvailable: 'true'});
    const hostels = await Hostel.find({});
    const rooms = await Room.find({isAvailable: 'true'}).populate("hostelId", "hostelName").lean();
    const myRooms = await Room.find({bookedBy: req.user.id}).populate("hostelId", "hostelName").lean();
    const numMyRooms = await Room.countDocuments({bookedBy: req.user.id});
    res.render("student-dashboard", {
      user: req.user, // Pass the user object to the dashboard for personalized greeting
      numHostels,
      numRooms,
      hostels,
      rooms,
      myRooms,
      numMyRooms
    });
  });
router.get("/book-room", ensureAuthenticated, async (req, res) => {
  const numHostels = await Hostel.countDocuments({});
  const numRooms = await Room.countDocuments({isAvailable: 'true'});
  const hostels = await Hostel.find({});
  const rooms = await Room.find({isAvailable: 'true'}).populate("hostelId", "hostelName").lean();
  res.render("student-book-room", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
    numHostels,
    numRooms,
    hostels,
    rooms,
  });
});

router.get("/myroom", ensureAuthenticated, async (req, res) => {
  try {
    const myRooms = await Room.find({ bookedBy: req.user.id }).populate("hostelId", "hostelName").lean();
    res.render("student-room", {
      user: req.user, // Pass the user object to the dashboard for personalized greeting
      myRoom:myRooms[0]
    });
  } catch (error) {
    res.render("student-room", {
      user: req.user,
      errorMessage: "You have no room booked." // Display error message
    });
  }
});

router.get("/myprofile", ensureAuthenticated, async (req, res) => {
  try {
    const myRooms = await Room.find({ bookedBy: req.user.id }).populate("hostelId", "hostelName").lean();
    res.render("student-profile", {
      user: req.user, // Pass the user object to the dashboard for personalized greeting
      myRoom:myRooms[0]
    });
  } catch (error) {
    res.render("student-profile", {
      user: req.user,
      errorMessage: "You have no room booked." // Display error message
    });
  }
});



// Administrator Dashboard
router.get("/admin-dashboard", ensureAdmin, async (req, res) =>{
    const numStudents = await User.countDocuments({role: 'student'});
    const numRooms = await Room.countDocuments({});
    const numBookedRooms = await Room.countDocuments({isAvailable: 'false'});
    res.render("admin-dashboard", {
        user: req.user,
        numStudents,
        numRooms,
        numBookedRooms
      })
}
 
);
router.get("/admin-hostel-management", ensureAdmin, async (req, res) => {
  const numHostels = await Hostel.countDocuments({});
  const numRooms = await Room.countDocuments({});
  const hostels = await Hostel.find({});
  const rooms = await Room.find({}).populate("hostelId", "hostelName").lean();
  res.render("admin-hostel-management", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
    numHostels,
    numRooms,
    hostels,
    rooms,
  });
});

router.post("/add-hostel", ensureAdmin, dashboardController.addHostel);
router.post("/add-room", ensureAdmin, dashboardController.addRoom);

router.get("/admin-user-management", ensureAdmin, async (req, res) =>{
    const numStudents = await User.countDocuments({role: 'student'});
    const students = await User.find({role: 'student'});
    res.render("admin-user-management", {
        user: req.user,
        numStudents,
        students
      })
});

module.exports = router;

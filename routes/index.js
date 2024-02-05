const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");

const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
// Welcome Page
router.get("/", (req, res) => res.render("index"));

// Student Dashboard
router.get("/student-dashboard", ensureAuthenticated, (req, res) =>
  res.render("student-dashboard", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
  })
);
router.get("/book-room", ensureAuthenticated, async (req, res) => {
  const numHostels = await Hostel.countDocuments({});
  const numRooms = await Room.countDocuments({});
  const hostels = await Hostel.find({});
  const rooms = await Room.find({}).populate("hostelId", "hostelName").lean();
  res.render("student-book-room", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
    numHostels,
    numRooms,
    hostels,
    rooms,
  });
});

// Administrator Dashboard
router.get("/admin-dashboard", ensureAdmin, (req, res) =>
  res.render("admin-dashboard", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
  })
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

router.get("/admin-user-management", ensureAdmin, (req, res) =>
  res.render("admin-user-management", {
    user: req.user, // Pass the user object to the dashboard for personalized greeting
  })
);

module.exports = router;

const users = require("./users");
const auth = require("./auth");
const attendances = require("./attendances");
const posts = require("./posts");
const categories = require("./categories");
const reservationCatgories = require("./reservationCategories");
const reservations = require("./reservactions");
const carReservations = require("./carReservations");
const carCategories = require("./carCategories");
const resourceCategories = require("./resourceCategories");
const resourceRegisters = require("./resourceRegisters");
const resourceBookings = require("./resourceBookings");

module.exports = {
  users,
  auth,
  attendances,
  posts,
  categories,
  reservationCatgories,
  reservations,
  carReservations,
  carCategories,
  resourceCategories,
  resourceRegisters,
  resourceBookings,
};

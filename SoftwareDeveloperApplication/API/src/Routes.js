const express = require("express");
const MongoDBServices = require("./MongoDBServices");
const router = express.Router();
const axios = require("axios");

/**
 * Create base root get request to get all activities
 */
router.get("/", async (req, res, next) => {
  try {
    const allActivities = await MongoDBServices.getAllActivities();

    return res.status(200).send({ allActivities });
  } catch (error) {
    next(error);
  }
});

/**
 * Create /request route to get a new activity from Bored API
 */
router.post("/request", async (req, res, next) => {
  try {
    const options = req.body;

    const request = await axios(
      `http://www.boredapi.com/api/activity?type=${
        options.type === "any" ? "" : options.type
      }&participants=${options.participants}&price=${
        options.price
      }&accessibility=${options.accessibility}`
    );

    res.status(200).send({ activity: request.data });
  } catch (error) {
    next(error);
  }
});

/**
 * Create /:id route to get a specific activity
 */
router.get("/:id", async (req, res, next) => {
  try {
    const activityId = req.params.id;

    const activity = await MongoDBServices.getActivity(activityId);

    res.status(200).send({ activity });
  } catch (error) {
    next(error);
  }
});

/**
 * Create /done/:id route to flag a specific activity as done
 */
router.put("/done/:id", async (req, res, next) => {
  try {
    const activityId = req.params.id;

    const activity = await MongoDBServices.doneActivity(activityId);

    res.status(200).send({ activity });
  } catch (error) {
    next(error);
  }
});

/**
 * Create base root post request to save a new activity
 */
router.post("/", async (req, res, next) => {
  try {
    const activityInfo = req.body;

    const activity = await MongoDBServices.saveActivity(activityInfo);

    res.status(200).send({ activity });
  } catch (error) {
    next(error);
  }
});

/**
 * Create 404 route for undefined calls
 */
router.get("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;

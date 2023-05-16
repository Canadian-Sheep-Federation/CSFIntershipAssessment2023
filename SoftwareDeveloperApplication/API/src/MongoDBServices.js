const ActivityModel = require("./ActivityModel");

/**
 * Create the set of functions that communicate with the MongoDB data store
 */
const MongoDBServices = {
  async getAllActivities() {
    return new Promise((resolve, reject) => {
      ActivityModel.find({}, (error, activities) => {
        if (error) {
          reject(error);
        } else {
          resolve(activities);
        }
      }).sort({ rating: -1 });
    });
  },

  async getActivity(activityId) {
    return new Promise((resolve, reject) => {
      ActivityModel.find(
        {
          _id: activityId,
        },
        (error, activity) => {
          if (error) {
            reject(error);
          } else {
            resolve(activity);
          }
        }
      );
    });
  },

  async saveActivity(activityDetails) {
    return new Promise((resolve, reject) => {
      ActivityModel.create(activityDetails, (error, newActivity) => {
        if (error) {
          reject(error);
        } else {
          resolve(newActivity);
        }
      });
    });
  },

  async doneActivity(activityId) {
    return new Promise((resolve, reject) => {
      ActivityModel.findOneAndUpdate(
        { _id: activityId },
        { done: true },
        (error, activity) => {
          if (error || !activity) {
            reject("UNABLE_TO_UPDATE_ACTIVITY");
          } else {
            resolve(activity);
          }
        }
      );
    });
  },
  async deleteActivity(activityId) {
    return new Promise((resolve, reject) => {
      ActivityModel.findOneAndDelete(
        { _id: activityId },
        (error, deleteActivity) => {
          if (error || !deleteActivity) {
            reject("UNABLE_TO_DELETE_ANNOUNCEMENT");
          } else {
            resolve(deleteActivity);
          }
        }
      );
    });
  },
};

module.exports = MongoDBServices;

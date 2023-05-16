import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import "./Saved.scss";

const PageSaved = () => {
  // Create necessary state variables
  const [allActivities, setAllActivities] = useState([]);
  const [sort, setSort] = useState("rating");
  const { axios } = useAxios();

  // create an async function to get all activities from backend
  const getAllActivities = async () => {
    axios.get("/").then((response) => {
      // sort activities based on sort variable
      if (sort === "rating") {
        setAllActivities(response.data.allActivities);
      } else {
        let sortObject = response.data.allActivities;
        sortObject.sort((a, b) =>
          a[sort] < b[sort] ? 1 : b[sort] < a[sort] ? -1 : 0
        );

        setAllActivities(sortObject);
      }
    });
  };
  // make sure to get all activities on page load
  useEffect(() => {
    getAllActivities();
  }, []);

  // change the sorting without calling the api
  useEffect(() => {
    let sortObject = [...allActivities];
    sortObject.sort((a, b) =>
      a[sort] < b[sort] ? 1 : b[sort] < a[sort] ? -1 : 0
    );

    setAllActivities(sortObject);
  }, [sort]);

  return (
    <>
      <div className="saved-page">
        {/* Sorting selector */}
        <h2 style={{ color: "#fff", display: "inline" }}>Sort by: </h2>
        <select
          name="sort"
          value={sort}
          onChange={(value) => {
            setSort(value.target.value);
          }}
        >
          <option key="rating" value="rating">
            Rating
          </option>
          <option key="type" value="type">
            Type
          </option>
          <option key="price" value="price">
            Price
          </option>
          <option key="participants" value="participants">
            Participants
          </option>
          <option key="accessibility" value="accessibility">
            Accessibility
          </option>
        </select>
        <div className="saved-container">
          <div className="saved-activities">
            <h1>Saved activities</h1>

            {allActivities.map((activity, index) => {
              if (!activity.done) {
                return (
                  <div key={index} className="activity">
                    <h2 className="activity-name">{activity.name}</h2>
                    <h3 className="activity-rating">
                      Rating: {activity.rating}
                    </h3>
                    <h4 className="activity-type">Type: {activity.type}</h4>
                    <h4 className="activity-price">
                      Price:{" "}
                      {activity.price > 0.33
                        ? activity.price > 0.66
                          ? "$$$"
                          : "$$"
                        : "$"}
                    </h4>
                    <h4 className="activity-participants">
                      Participants: {activity.participants}
                    </h4>
                    <h4 className="activity-accessibility">
                      Accessibility:{" "}
                      {activity.accessibility > 0.33
                        ? activity.accessibility > 0.66
                          ? "Not Very Accessible"
                          : "Somewhat Accessible"
                        : "Very Accessible"}
                    </h4>
                    <button
                      onClick={async () => {
                        console.log(activity);
                        axios.put(`/done/${activity._id}`).then((response) => {
                          getAllActivities();
                        });
                      }}
                    >
                      Done
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <div className="done-activities">
            <h1>Done activities</h1>
            {allActivities.map((activity, index) => {
              if (activity.done) {
                return (
                  <div key={index} className="activity">
                    <h2 className="activity-name">{activity.name}</h2>
                    <h3 className="activity-rating">
                      Rating: {activity.rating}
                    </h3>
                    <h4 className="activity-type">Type: {activity.type}</h4>
                    <h4 className="activity-price">
                      Price:{" "}
                      {activity.price > 0.33
                        ? activity.price > 0.66
                          ? "$$$"
                          : "$$"
                        : "$"}
                    </h4>
                    <h4 className="activity-type">
                      Participants: {activity.participants}
                    </h4>
                    <h4 className="activity-type">
                      Accessibility:{" "}
                      {activity.accessibility > 0.33
                        ? activity.accessibility > 0.66
                          ? "Not Very Accessible"
                          : "Somewhat Accessible"
                        : "Very Accessible"}
                    </h4>
                    <button
                      onClick={async () => {
                        console.log(activity);
                        axios
                          .delete(`/delete/${activity._id}`)
                          .then((response) => {
                            getAllActivities();
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { PageSaved };

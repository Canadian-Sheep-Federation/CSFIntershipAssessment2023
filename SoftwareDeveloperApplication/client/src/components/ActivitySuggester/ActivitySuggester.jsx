import { useEffect, useState } from "react";

import "./ActivitySuggester.scss";
import useAxios from "../../utils/useAxios";

const ActivitySuggester = () => {
  // initialize all the state required for the request form
  const [accessibility, setAccessibility] = useState(0);
  const [type, setType] = useState("any");
  const [participants, setParticipants] = useState(1);
  const [price, setPrice] = useState(0);
  const types = [
    "any",
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];
  const [options, setOptions] = useState({});
  // initialize the state required for saving
  const [activity, setActivity] = useState();
  const [random, setRandom] = useState(false);
  const [likely, setLikely] = useState(0);

  const { axios } = useAxios();

  // add option for random activity
  useEffect(() => {
    if (!random) {
      setOptions({
        accessibility,
        type,
        participants,
        price,
      });
    } else {
      setOptions({
        accessibility: "",
        type: "",
        participants: "",
        price: "",
      });
    }
  }, [random, accessibility, type, participants, price]);

  // the component is made up of two forms. One for requesting of an activity and one for saving it to the database
  return (
    <>
      <div className="activity-container">
        <div className="activity-request-form">
          <form
            className="request-form"
            onSubmit={async (event) => {
              /** 
                    On submit of the form send all info to the backend
                    */
              event.preventDefault();

              axios.post("/request", options).then((response) => {
                setActivity(response.data.activity);
              });
            }}
          >
            <label>
              Number of Participants: {participants} <br />
              <input
                name="participants"
                type="range"
                min={1}
                max={5}
                step={1}
                value={participants}
                id="participants"
                onChange={(value) => {
                  setParticipants(value.target.value);
                }}
              />
            </label>
            <br />
            <label>
              Type: {type} <br />{" "}
              <select
                name="type"
                value={type}
                onChange={(value) => {
                  setType(value.target.value);
                }}
              >
                {types.map((activityType, index) => {
                  return (
                    <option key={activityType + index} value={activityType}>
                      {activityType}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />

            <label>
              Price: {price > 0.33 ? (price > 0.66 ? "$$$" : "$$") : "$"} <br />
              <input
                name="price"
                type="range"
                min={0}
                max={1.0}
                step={0.1}
                value={price}
                id="price"
                onChange={(value) => {
                  setPrice(value.target.value);
                }}
              />
            </label>
            <br />
            <label>
              Accessibility:{" "}
              {accessibility > 0.33
                ? accessibility > 0.66
                  ? "Not Very Accessible"
                  : "Somewhat Accessible"
                : "Very Accessible"}
              <br />
              <input
                name="accessibility"
                type="range"
                min={0.0}
                max={1.0}
                step={0.1}
                value={accessibility}
                id="accessibility"
                onChange={(value) => {
                  setAccessibility(value.target.value);
                }}
              />
            </label>

            <br />
            <input name="submit" type="submit" value="Get An Activity" />
            <label>
              {" "}
              random?{" "}
              <input
                type="checkbox"
                id="random"
                name="random"
                checked={random}
                onChange={() => {
                  setRandom(!random);
                }}
              />
            </label>
          </form>
        </div>
        <div className="activity-suggested">
          {activity ? (
            <>
              <h2>Activity:</h2>

              <br />

              <h3 className="rainbow rainbow_text_animated">
                {activity.error ? activity.error : activity.activity}
              </h3>

              {activity.error ? (
                <></>
              ) : (
                <form
                  className="save-form"
                  onSubmit={(event) => {
                    /** 
                    On submit of the form send all info to the backend
                    */
                    event.preventDefault();
                    const details = {
                      name: activity.activity,
                      type: activity.type,
                      participants: activity.participants,
                      price: activity.price,
                      key: activity.key,
                      accessibility: activity.accessibility,
                      rating: likely,
                    };
                    axios.post("/", details).then((response) => {
                      console.log(response.data.activity);
                      setActivity();
                    });
                  }}
                >
                  <label>
                    How likely to do it: {likely}
                    <br />
                    <input
                      name="likely"
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={likely}
                      id="likely"
                      onChange={(value) => {
                        setLikely(value.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <input name="submit" type="submit" value="Save Activity" />
                </form>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export { ActivitySuggester };

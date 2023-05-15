import { useState } from "react";

import "./ActivitySuggester.scss";
import useAxios from "../../utils/useAxios";

const ActivitySuggester = () => {
  // initialize all the state required for the request form
  const [accessibility, setAccessibility] = useState(0.42);
  const [type, setType] = useState("any");
  const [participants, setParticipants] = useState(3);
  const [price, setPrice] = useState(1);
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
  // initialize the state required for saving
  const [activity, setActivity] = useState();
  const [likely, setLikely] = useState(0);
  // the component is made up of two forms. One for requesting of an activity and one for saving it to the database
  return (
    <>
      <div className="activity-container">
        <div className="activity-request-form">
          <form
            className="request-form"
            onSubmit={(event) => {
              event.preventDefault();
              console.log({ accessibility, type, participants, price });
              setActivity(Math.random() * 10000);
            }}
          >
            <label>
              Number of Participants: {participants} <br />
              <input
                name="participants"
                type="range"
                min={1}
                max={15}
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
                step={0.01}
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
                step={0.01}
                value={accessibility}
                id="accessibility"
                onChange={(value) => {
                  setAccessibility(value.target.value);
                }}
              />
            </label>

            <br />
            <input name="submit" type="submit" value="Get An Activity" />
          </form>
        </div>
        <div className="activity-suggested">
          {activity ? (
            <>
              <h2>Activity:</h2>

              <br />

              <h3 className="rainbow rainbow_text_animated">{activity}</h3>

              <form
                className="save-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setActivity();
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

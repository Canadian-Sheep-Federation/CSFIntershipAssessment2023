import axios from "axios";

// TVMaze API URL
const public_api_url = "https://api.tvmaze.com/";

// Server URL
const server_url = "http://localhost:8888/";

// GET: Sets TV Shows Data from TVMaze API for a specific search string
// payload: object that contains query param "searchString"
// setTVShows: state hook to store api response data
export function searchTVShows(payload, setTVShows) {
  axios
    .get(
      `${public_api_url}search/shows?q=${encodeURIComponent(
        payload.searchString
      )}`
    )
    .then((res) => {
      setTVShows(res.data);
    });
}

// GET: Gets Existing Surveys
// payload: object that contains path param "id"
// setSurveys: state hook to store api response data
export function getShowSurveys(payload, setSurveys) {
  const id = payload.id;

  if (id === null) {
    axios.get(`${server_url}`).then((res) => {
      setSurveys(res.data.surveys);
    });
  } else {
    axios.get(`${server_url}${id}`).then((res) => {
      setSurveys(res.data.surveys);
    });
  }
}

// POST: Sumbit Survey Entry
// payload: object that contains body params: email, showName, rating
export function sumbitSurveyEntry(payload) {
  axios.post(`${server_url}`, {
    email: payload.email,
    showName: payload.showName,
    rating: payload.rating,
  });
}

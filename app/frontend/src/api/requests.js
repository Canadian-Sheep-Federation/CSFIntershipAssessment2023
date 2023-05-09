import axios from "axios";

// TVMaze API URL
const public_api_url = "https://api.tvmaze.com/";

// payload: object that contains query param "searchString"
// setTVShows: state hook to store api response data
export function searchTVShows(payload, setTVShows) {
  axios
    .get(`${public_api_url}search/shows?q=${encodeURIComponent(payload.searchString)}`)
    .then((res) => {
      setTVShows(res.data);
    });
}

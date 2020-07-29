import axios from "axios";

export default {
  getRestaurants(searchQuery) {
    //Grab term & location from the query
    var term = searchQuery.restaurantName;
    var location = searchQuery.restaurantLocation;

    //Case where both term and location is null
    if (term === null && typeof location !== "string") {
      return axios
        .get(
          `http://localhost:5000/restaurants/auto/${searchQuery.restaurantLocation.latitude}/${searchQuery.restaurantLocation.longitude}`
        )
        .then((response) => {
          return response;
        });
    }

    //Case where there is no term but has a location
    else if (term === null && location !== null) {
      return axios
        .get(`http://localhost:5000/restaurants/${location}`)
        .then((response) => {
          return response;
        });
    }
    //Case where there is a term but no location
    else if (typeof location !== "string") {
      return axios
        .get(
          `http://localhost:5000/restaurants/${searchQuery.restaurantLocation.latitude}/${searchQuery.restaurantLocation.longitude}/${term}`
        )
        .then((response) => {
          return response;
        });
    } else {
      //Make api call to the backend with the query params
      return axios
        .get(`http://localhost:5000/restaurants/${location}/${term}`)
        .then((response) => {
          return response;
        });
    }
  },
};

import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async homeListRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async addReviewRestaurant(data) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async searchRestaurant(query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const responseJson = await response.json();

      const { restaurants } = responseJson;
      if (restaurants.length > 0) {
        return Promise.resolve(restaurants);
      }
      return Promise.reject(new Error(`"${query}" is not found`));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default TheRestaurantDbSource;

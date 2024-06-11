/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <section class="content">
        <div class="restaurantList">
          <h2 tabindex="0">Your Favorite Restaurant</h2>
          <section class="search_section">
            <form tabindex="0" id="searchRestaurant" aria-label="Search Restaurant">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input id="query" type="text" placeholder="Search name restaurant..." aria-label="Search by restaurant name" />
            </form>
          </section>

          <div id="restaurants" class="restaurants" aria-live="polite"></div>
        </div>
      </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;

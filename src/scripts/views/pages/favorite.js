/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantView from './favorite-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './favorite-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './favorite-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    const favoriteRestaurant = document.querySelector('.restaurants');
    const nav = document.querySelector('nav');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.style.backgroundColor = '#161616';
        } else {
          nav.style.backgroundColor = 'transparent';
        }
      });
    });

    observer.observe(favoriteRestaurant);
  },
};

export default Favorite;

import TheRestaurantDbSource from '../../data/therestaurantidb-source';
import { createRestaurantItemTemplate, createSkeletonRestaurantTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="jumbotron">
            <h2 tabindex="0">Embark on a culinary journey</h2>
            <h1 tabindex="0">Discover top-notch dining experiences with Manger Apps</h1>
            <p tabindex="0">
                Embark on a culinary adventure with Manger Apps! 
                Discover and explore thousands of top-notch dining options in your city with ease. 
                Indulge in unforgettable culinary experiences at your fingertips. Let's dine in style, let's dine with Manger Apps!
            </p>
            <a tabindex="0" href="#restaurantContent" class="button">Explore</a>
        </div>
        <section class="content" id="restaurantContent">
            <div class="restaurantList">
                <h2 tabindex="0">Explore Restaurant</h2>
                <section class="search_section">
                    <form tabindex="0" id="searchRestaurant" aria-label="Search Restaurant">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input id="query" type="text" placeholder="Search name restaurant..." aria-label="Search by restaurant name" />
                    </form>
                </section>
                <div id="restaurants" class="restaurants" aria-live="polite">
                  ${createSkeletonRestaurantTemplate(20)}
                </div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.homeListRestaurant();
    const restaurantContainer = document.getElementById('restaurants');
    restaurantContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement('div');
      restaurantElement.classList.add('restaurant-item');
      restaurantElement.innerHTML += createRestaurantItemTemplate(restaurant);
      restaurantContainer.appendChild(restaurantElement);
    });

    const searchInput = document.getElementById('query');
    searchInput.addEventListener('input', () => {
      this.searchRestaurant();
    });

    const jumbotron = document.querySelector('.jumbotron');
    const nav = document.querySelector('nav');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.style.backgroundColor = 'transparent';
        } else {
          nav.style.backgroundColor = '#161616';
        }
      });
    });

    observer.observe(jumbotron);
  },

  searchRestaurant() {
    const search = document.querySelector('#query').value.trim().toUpperCase();
    const returnSearch = document.getElementsByClassName('restaurant-item');

    // eslint-disable-next-line no-restricted-syntax
    for (const restaurantItem of returnSearch) {
      const nameRestaurant = restaurantItem.querySelector('h2').innerText.toUpperCase();
      const searchRestaurant = nameRestaurant.search(search);
      // eslint-disable-next-line eqeqeq
      if (searchRestaurant != -1) {
        restaurantItem.style.display = '';
      } else {
        restaurantItem.style.display = 'none';
      }
    }
  },
};

export default Home;

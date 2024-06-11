/* eslint-disable no-undef */
import FavoriteRestaurantView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

          done();
        });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });

    describe('When favorite restaurants exist', () => {
      it('should show the restaurants', (done) => {
        document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
          done();
        });
        const favoriteRestaurants = {
          getAllRestaurants: jest.fn().mockImplementation(() => [
            {
              id: 11,
              name: 'A',
              city: 'Kota A',
              pictureId: '11',
              description: 'Sebuah restaurant A',
              rating: 4.5,
            },
            {
              id: 22,
              name: 'B',
              city: 'Kota B',
              pictureId: '22',
              description: 'Sebuah restaurant B',
              rating: 4.2,
            },
          ]),
        };

        // eslint-disable-next-line no-new
        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });
      });
    });
  });
});

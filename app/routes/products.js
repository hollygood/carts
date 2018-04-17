import Route from '@ember/routing/route';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default Route.extend({
  model() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: 'https://s3.amazonaws.com/joefresh-marketing-dev/developer-interview/full-list-bb.json',
        crossDomain: true,
        xhrFields: {
          'withCredentials': false
        },

        success: function(response) {
          resolve(response.results);
        },
        error: function(reason) {
          reject(reason);
        }
      });
    });

  },

  setupController: function(controller, model) {
    controller.set('products', model);
  }
});

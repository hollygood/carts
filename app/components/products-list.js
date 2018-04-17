import Component from '@ember/component';
import { computed, set } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  addedProducts: [],

  subTotal: 0,

  taxTotal: computed('subTotal', function() {
    return +(0.05 * this.get('subTotal')).toFixed(2);
  }),

  total: computed('subTotal', 'taxTotal', function() {
    return this.get('subTotal') + this.get('taxTotal');
  }),

  totalPage: computed('products', function() {
    return Math.floor(this.get('products').length / 6 ) + 1;
  }),

  pageNumbers: computed('totalPage', function() {
    let numbers = [];

    for (let i = 1; i <= this.get('totalPage'); i++) {
      numbers.push(i);
    }

    return numbers;
  }),

  start: 0,

  max: 6,

  currentPage: 1,

  nextPage: computed('currentPage', function() {
    return this.get('currentPage') + 1;
  }),

  prevPage: computed('currentPage', function() {
    return this.get('currentPage') - 1;
  }),

  calculateTotal() {
    return this.get('addedProducts').reduce((accum, product) => {
      return accum + product.details.productPrice * product.count
    }, 0);
  },

  actions: {
    add(product) {
      const locationInCart = this.get('addedProducts').findIndex(p => {
        return p.details.productId === product.productId;
      });

      if (locationInCart === -1) {
        this.get('addedProducts').pushObject({
          details: product,
          count: 1
        });
      } else {
        let count = this.get('addedProducts')[locationInCart].count + 1;
        set(this.get('addedProducts')[locationInCart], 'count', count);
      }

      this.set('subTotal', this.calculateTotal());
    },

    remove(id) {
      const locationInCart = this.get('addedProducts').findIndex(p => {
        return p.details.productId === id;
      });

      if (this.get('addedProducts')[locationInCart].count <= 1){
        this.get('addedProducts').removeAt(locationInCart);
      } else {
        let count = this.get('addedProducts')[locationInCart].count - 1;
        set(this.get('addedProducts')[locationInCart], 'count', count);
      }

      this.set('subTotal', this.calculateTotal());
    },

    filterProducts(number) {
      event.preventDefault();
      let start = (number -1 ) * 6;
      let max = number * 6;

      this.set('start', start);
      this.set('max', max);
      this.set('currentPage', number);
    }
  }
});

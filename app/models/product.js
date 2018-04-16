import DS from 'ember-data';

export default DS.Model.extend({
  productName: DS.attr('string'),
  productPrice: DS.attr('number'),
  thumbnails: DS.attr('array'),
});

App = Ember.Application.create();
App.SiteAdapter = DS.FixtureAdapter.extend();

App.Site = DS.Model.extend({
    name: DS.attr(),
    url: DS.attr(),
    rating: DS.attr(),
    desc: DS.attr()
});

App.Site.FIXTURES = [
    {
        id: 1,
        name: 'Вконтакте',
        url: 'https://vk.com',
        rating: 3,
        desc: '«ВКонтакте» (VK.com) — крупнейшая в Рунете социальная сеть.'
    },
    {
        id: 2,
        name: 'Facebook',
        url: 'https://www.facebook.com',
        rating: 3,
        desc: 'Facebook — одна из крупнейших социальных сетей в мире.'
    },
    {
        id: 3,
        name: 'Myspace',
        url: 'https://myspace.com',
        rating: 3,
        desc: 'MySpace — международная социальная сеть.'
    }
];

App.Router.map(function(){
  this.resource("sites");
  this.resource("site", { path: 'site/:site_id' });
 });

App.SitesRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('site');
    }
});



App.IndexRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo('sites');
    }
});

App.SiteRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('site', params.site_id);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
  });

App.SiteController = Ember.ObjectController.extend({
  actions: {
   saveRating: function (param,rating) {
      var st_rating = this.get('model');
      st_rating.set('rating', rating );
      st_rating.save();
    },
    }
})

App.SiteRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('site', params.site_id);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
  });
  
  App.SiteView = Ember.View.extend({

  rating: Ember.computed.alias('context.rating'),
  fullStars: function() {
    return this.get('rating');
  }.property('rating'),
  numStars:  5,


  starRange: function(start, end, type) {
    var starsData = [];
    for (i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    };
    return starsData;
  },
  actions: {
    setRating: function() {
      var newRating = $(event.target).data('rating');
      this.set('rating', newRating);
    }
  },
    stars: function() {
    var ratings = [];
    var fullStars = this.starRange(1, this.get('fullStars'), 'full');
    var emptyStars = this.starRange(this.get('fullStars') + 1, this.get('numStars'), 'empty');
    Array.prototype.push.apply(ratings, fullStars);
    Array.prototype.push.apply(ratings, emptyStars);
    return ratings;
  }.property('fullStars', 'numStars')
});

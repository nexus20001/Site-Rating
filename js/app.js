App = Ember.Application.create();
App.SiteAdapter = DS.FixtureAdapter.extend();
//App.Store = DS.Store.extend();

App.Site = DS.Model.extend({
    rate: DS.belongsTo('rating'),
    name: DS.attr(),
    url: DS.attr(),
    desc: DS.attr()
});


App.Rating = DS.Model.extend({
    st: DS.belongsTo('site'),
    rating: function() {
    return localStorage.getItem(this.get('id')) ? localStorage.getItem(this.get('id')) : 3;
  }.property('id')

});

App.Rating.FIXTURES = [
    {
        id: 1,
        st: 1,
    },
    {
        id: 2,
        st: 2,  
    },
    {
        id: 3,
        st: 3,
    }
];

App.Site.FIXTURES = [
    {
        id: 1,
        rate: 1,
        name: 'Вконтакте',
        url: 'https://vk.com',
        desc: '«ВКонтакте» (VK.com) — крупнейшая в Рунете социальная сеть.'
    },
    {
        id: 2,
        rate:2,
        name: 'Facebook',
        url: 'https://www.facebook.com',
        desc: 'Facebook — одна из крупнейших социальных сетей в мире.'
    },
    {
        id: 3,
        rate:3,
        name: 'Myspace',
        url: 'https://myspace.com',
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
    actions: {
    saveRating: function(id,rating) {
      var st_rating = this.store.find('rating', id);
      st_rating.set('rating', rating);
      st_rating.save();
    }
  }
});

App.StarRatingComponent = Ember.Component.extend({
    maxStars: 5,
    starRating: 0,
    stars: [],
    actions: {
        click: function(star){
            localStorage.setItem(this.get('param.id'), star.index);
            this.set('starRating', star.index);
            this.sendAction('action',  this.get('param.id') ,star.index);
        }
    },
    setRating: function() {
        var stars = [], i = 0;
        var starRating =  localStorage.getItem(this.get('param.id')) ? localStorage.getItem(this.get('param.id')) : 3;
        for(i = 0; i < this.get('maxStars'); i++){
            stars.pushObject(Em.Object.create({empty:i >= starRating, index:i+1}));
        }
        this.set('stars', stars);
    }.observes('starRating').on('didInsertElement')
});

App = Ember.Application.create();
App.SiteAdapter = DS.FixtureAdapter.extend();

App.Site = DS.Model.extend({
    name: DS.attr(),
    url: DS.attr(),
    desc: DS.attr()
});

App.Site.FIXTURES = [
    {
        id: 1,
        name: 'Вконтакте',
        url: 'https://vk.com',
        desc: '«ВКонтакте» (VK.com) — крупнейшая в Рунете социальная сеть.'
    },
    {
        id: 2,
        name: 'Facebook',
        url: 'https://www.facebook.com',
        desc: 'Facebook — одна из крупнейших социальных сетей в мире.'
    },
    {
        id: 3,
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

App.SiteRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('site', params.site_id);
  }
});

App.IndexRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo('sites');
    }
});

App.StarRatingComponent = Ember.Component.extend({
    maxStars: 5,
    starRating: 0,
    stars: [],
    actions: {
        click: function(star){
          //  alert(star.index);
            localStorage.setItem(this.get('param.id'), star.index);
            this.set('starRating', star.index);

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

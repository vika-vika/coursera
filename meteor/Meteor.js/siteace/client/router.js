Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"top"
  });
  this.render('main_layout', {
    to:"bottom"
  });
});

Router.route('/page/:_id', function () {
  this.render('navbar', {
    to:"top"
  });
  this.render('webpage_layout', {
    to:"bottom", 
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
}); 
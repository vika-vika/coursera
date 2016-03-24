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

Router.route('/search/:_query', function () {
  this.render('navbar', {
    to:"top"
  });
  this.render('website_search', {
    to:"bottom", 
    data:function(){	   
       return {websites: Websites.find({
		   $or:[
			  {"title": {'$regex': this.params._query, '$options' : 'i'}},
			  {"description": {'$regex': this.params._query, '$options' : 'i'}}
	       ] // or
	   })};
	   
	/*	   {$or:[
        {"field1":{"$in":["foo","bar"]}},
        {"field2":{"$in":["foo","bar"]}}*/

	   }
     })
  });


Router.route('/page/:_id', function () {
  this.render('navbar', {
    to:"top"
  });
  this.render('webpage_layout', {
    to:"bottom", 
    data:function(){
	  console.log(this.params._id);
      return Websites.findOne({_id:this.params._id});
    }
  });
}); 

	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{rating:-1}}, {});
		}
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			var _rating = Websites.findOne({_id:website_id}).rating + 1;
			Websites.update({_id:website_id}, {$set: {rating:_rating}}); 

			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);
			var _rating = Websites.findOne({_id:website_id}).rating - 1;
			Websites.update({_id:website_id}, {$set: {rating:_rating}}); 

			// put the code in here to remove a vote from a website!

			return false;// prevent the button from reloading the page
		}
	})
	
	
	Template.navbar.events({
		"click .js-search":function(event) {
			var search = $('#search').val();
			window.location.href = "/search/"+search;
			//var regex = new RegExp("/.*" + search + ".*/i");
			//findOne({"username" : {$regex : ".*son.*"}});
			console.log(Websites.findOne({"title" : {'$regex' : search, '$options' : 'i'}}));
	}});

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
			Websites.insert({
				title:event.target.title.value, 
				url:event.target.url.value, 
				description:event.target.description.value, 
				rating: 0,
				createdOn:new Date()
    	    });
			$('.js-save-website-form').trigger("reset");
			$("#website_form").hide();
			return false;// stop the form submit from reloading the page

		}
	});

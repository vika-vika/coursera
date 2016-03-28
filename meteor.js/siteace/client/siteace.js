
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
			Meteor.call("setRating", {website_id:website_id, rating:_rating});
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);
			var _rating = Websites.findOne({_id:website_id}).rating - 1;
			Meteor.call("setRating", {website_id:website_id, rating:_rating});

			// put the code in here to remove a vote from a website!

			return false;// prevent the button from reloading the page
		}
	})
	
	
	Template.navbar.events({
		"click .js-search":function(event) {
			var search = $('#search').val();
			window.location.href = "/search/"+search;
	}});

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
			var url = event.target.url.value;
			if (!url || 0 === url.length) {
				alert("Please enter url");
				return false;
			}
			
			var title = event.target.title.value;
			if (!title || 0 === title.length) {
				alert("Please enter title");
				return false;
			}
			
		    var description = event.target.description.value;
			if (!description || 0 === description.length) {
				alert("Please enter description");
				return false;
			}
			Meteor.call("addWebsite", {url:url, title:title, description:description});
			$('.js-save-website-form').trigger("reset");
			$("#website_form").hide();
			return false;// stop the form submit from reloading the page

		}
	});

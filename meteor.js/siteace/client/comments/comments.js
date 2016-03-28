Template.comments_form.events({
		"submit .js-post-comment-form":function(event){
			var page_id = this._id;
			var name = Meteor.user() ? Meteor.user().username : event.target.name.value;
			Meteor.call("addComment", 
				{name:name, 
				comment:event.target.comment.value,
				page_id: page_id});

			$('.js-post-comment-form').trigger("reset");		
			return false;// stop the form submit from reloading the page

		}
	});
	
	Template.comments_list.helpers({
		comments:function(){
			return Comments.find({webpage_id:this._id}, {sort:{createdOn:-1}}, {});
		}
	});
	
	Template.comments_form.helpers({
		username:function(){
			if (Meteor.user())
				return Meteor.user().username;
		}
	});
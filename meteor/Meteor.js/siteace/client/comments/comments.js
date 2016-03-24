Template.comments_form.events({
		"submit .js-post-comment-form":function(event){

			var page_id = this._id;
			var date = new Date().toJSON().slice(0,19);
			Comments.insert({
				name:event.target.name.value, 
				comment:event.target.comment.value, 
				webpage_id: page_id,
				createdOn: date
    	    });
			$('.js-post-comment-form').trigger("reset");
			 Meteor.call('foo');
			
			return false;// stop the form submit from reloading the page

		}
	});
	
	Template.comments_list.helpers({
		comments:function(){
			return Comments.find({webpage_id:this._id}, {sort:{createdOn:-1}}, {});
		}
	});
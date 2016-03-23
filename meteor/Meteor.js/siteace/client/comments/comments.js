Template.comments_form.events({
		"submit .js-post-comment-form":function(event){

			var comment = event.target.comment.value;
			console.log(comment);
			var page_id = this._id;
			Comments.insert({
				name:event.target.name.value, 
				comment:event.target.comment.value, 
				webpage_id: page_id,
				createdOn:new Date()
    	    });
			$('.js-post-comment-form').trigger("reset");
			return false;// stop the form submit from reloading the page

		}
	});
	
	Template.comments_list.helpers({
		comments:function(){
			return Comments.find({}, {sort:{createdOn:-1}}, {});
		}
	});
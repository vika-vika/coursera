Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");
// set up security on Images collection
Websites.allow({
	update:function(userId, doc){
		return false;
	},
	insert:function(userId, doc){
		return false;
	}, 
	remove:function(userId, doc){
		return false;
	}
})  

// set up security on Images collection
Comments.allow({

	update:function(userId, doc){
		return false;
	},
	insert:function(userId, doc){
		return false;
	}, 
	remove:function(userId, doc){
		return false;
	}
 })  

	

  Meteor.methods({
  addWebsite : function (website) {

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
	Websites.insert({
			title:website.title, 
			url:website.url, 
			description:website.description, 
			rating: 0,
			createdOn:new Date()
    });
  },
   addComment : function (comment) {
	var date = new Date().toJSON().slice(0,19);

	Comments.insert({
		name:comment.name, 
		comment:comment.comment, 
		webpage_id: comment.page_id,
		createdOn: date
    });
  },
  setRating : function (data) {
	  Websites.update({_id:data.website_id}, {$set: {rating:data.rating}}); 
  }
  
  })
  
  Meteor.startup(function () {
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
			rating:11,
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
			rating:5,
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
			rating:7,
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
			rating:2,
    		createdOn:new Date()
    	});
    }
  });

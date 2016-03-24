
	
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
	console.log(extractMeta('http://efounders.co'));
	console.log(extractMeta('http://coursera.com'));
	console.log(extractMeta('http://meteortips.com/first-meteor-tutorial/methods/'));
	console.log(extractMeta('http://stackoverflow.com/questions/17899515/meteor-call-server-method-in-client-got-404-method-not-found-error'));
	  
    // code to run on server at startup
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
    		description:"Universal access to the world�s best education.", 
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

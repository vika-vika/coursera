
Meteor.subscribe("usersToChat");
Meteor.subscribe("Chats");

  // helper functions 
  /// 
  Template.available_user_list.helpers({
    users:function(){
      return Meteor.users.find({_id: {$ne: Meteor.userId()}});
    }
  })
 Template.available_user.helpers({
    getUsername:function(userId){
      user = Meteor.users.findOne({_id:userId});
      return user.profile.username;
    }, 
    isSelectedUser:function(userId){
      if (userId == Session.get("otherUserId")){
        return true;
      } else {
        return false;
      }
    }
  })

  Template.chat_message.helpers({
	 isOwnMessage :  function() {
		 return this.owner === Meteor.userId();
	 },
	 name: function() {
		var profile =  Session.get(this.owner);
		if (profile) {
			return profile.username; 
		} else 
			return "admin"; 
	 }, 
	 avatar: function() {
	 	var profile =  Session.get(this.owner);
		if (profile) {
			return profile.avatar; 
		} else 
			return "ava1.png"; 
	 }
  });
  
  Template.available_user.events({
    'click .js-user-click': function(event){
		if (!Meteor.userId()) {
			alert("Please login first to start the chat");
			return;
		}
        var otherUserId = this._id;
		Session.set(otherUserId, this.profile);
		Session.set(Meteor.userId(), Meteor.user().profile);

		// find a chat that has two users that match current user id
		// and the requested user id
		var filter = {$or:[
                {user1Id:Meteor.userId(), user2Id:otherUserId}, 
                {user2Id:Meteor.userId(), user1Id:otherUserId}
                ]};
		var chat = Chats.findOne(filter);
		var chatId;

		if (!chat){// no chat matching the filter - need to insert a new one
			Meteor.call('addChat', {user1Id:Meteor.userId(), user2Id:otherUserId}, function(error, result) {
				chatId = result;
                Session.set("chatId", chatId);
			    Session.set("otherUserId", otherUserId);				
			});	
		} else {// there is a chat going already - use that. 
			chatId = chat._id;
			Session.set("chatId", chatId);
			Session.set("otherUserId", otherUserId);
		}
    }
});

  Template.chat_page.helpers({
    messages:function() {  
	  if (!Meteor.userId()) {
		   Session.set("chatId", -1);
		   Session.set("otherUserId", -1);
	  }
      var chat = Chats.findOne({_id:Session.get("chatId")});
	  
	  if (chat)  {
		return chat.messages;	
	  }
    }, 
	chat: function (){
		 var chat = Chats.findOne({_id:Session.get("chatId")});
		 return chat;
	},
    other_user:function(){
      return ""
    }, 

  })
 Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat':function(event){
    // stop the form from triggering a page reload
    event.preventDefault();
    // see if we can find a chat object in the database
    // to which we'll add the message
    var chat = Chats.findOne({_id:Session.get("chatId")});
    if (chat){// ok - we have a chat to use
      var msgs = chat.messages; // pull the messages property
      if (!msgs){// no messages yet, create a new array
        msgs = [];
      }
      // is a good idea to insert data straight from the form
      // (i.e. the user) into the database?? certainly not. 
      // push adds the message to the end of the array
      msgs.push({text: event.target.chat.value, owner: Meteor.userId()});
      // reset the form
      event.target.chat.value = "";
      // put the messages array onto the chat object
      chat.messages = msgs;
      // update the chat object in the database.
	  Meteor.call('addMessage', {id:chat._id, chat:chat});
    }
  }
 })
 

$('textarea').on({input: function(){
    var totalHeight = $(this).prop('scrollHeight') - parseInt($(this).css('padding-top')) - parseInt($(this).css('padding-bottom'));
    $(this).css({'height':totalHeight});
}
});
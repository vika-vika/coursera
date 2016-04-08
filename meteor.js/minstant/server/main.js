// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123 

  Meteor.startup(function () {
    if (!Meteor.users.findOne()){
      for (var i=1;i<9;i++){
        var email = "user"+i+"@test.com";
        var username = "user"+i;
        var avatar = "ava"+i+".png"
        console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({profile:{username:username, avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }
    } 
  });
 
  Accounts.onCreateUser(function(options, user) {
    /*if (options.secretAttribute)
        user.secretAttribute = options.secretAttribute;*/
	 
    if (options.profile) {
        user.profile = options.profile;		
		user.profile.avatar = options.profile.gender === 'f' ? "avaf.png" : "avam.png";
	}

    return user;
});

Meteor.methods({
  addChat : function (chat) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
	}
    var id = Chats.insert({user1Id:chat.user1Id, user2Id:chat.user2Id});
    var chat = Chats.findOne({_id:id});
    var msgs = [];
    msgs.push({text: "Hi! Nice to see you in the chat! :)", owner: -1});
    chat.messages = msgs;
	Chats.update(id, chat)   
	return id;
  }, 
  addMessage: function (chat) {
	  if (! Meteor.userId()) {
		throw new Meteor.Error("not-authorized");
	  }
	  Chats.update(chat.id, chat.chat)   
  }
})

Meteor.publish("usersToChat", function(){
  return Meteor.users.find();
})

Meteor.publish("Chats", function(){
  var filter = {$or:[{user1Id:this.userId},{user2Id:this.userId}]}
  return Chats.find(filter);
})


		
Parse.Cloud.afterSave(Parse.Message, function(request, response) {
    var message = request.object;
    if (message.existed()) { return; }

    var roleName = message.audianceRole;
    var friendRole = new Parse.Role(roleName, new Parse.ACL(user));
    return friendRole.save().then(function(friendRole) {
        var acl = new Parse.ACL();
        acl.setReadAccess(friendRole, true);
        acl.setReadAccess(user, true);

        var friendData = new Parse.Object("FriendData", {
          user: user,
          ACL: acl,
          profile: "my friend profile"
        });
        return friendData.save();
    });
});

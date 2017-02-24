Parse.Cloud.afterSave(Parse.Message, (request, response) => {
  const message = request.object;
  if (message.existed()) { return; }

  const roleName = message.audianceRole;
  const friendRole = new Parse.Role(roleName, new Parse.ACL(user));
  return friendRole.save().then((friendRole) => {
    const acl = new Parse.ACL();
    acl.setReadAccess(friendRole, true);
    acl.setReadAccess(user, true);

    const friendData = new Parse.Object('FriendData', {
      user,
      ACL: acl,
      profile: 'my friend profile'
    });
    return friendData.save();
  });
});

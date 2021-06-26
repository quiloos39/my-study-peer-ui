import getLocalProfile from "./GetLocalProfile";

function getPermission({ teammates, post }) {
  let localProfile = getLocalProfile();
  if (localProfile !== null) {
    if (
      teammates.filter((member) => member.userId === localProfile.id).length ===
      1
    ) {
      return 1;
    } else if (localProfile.id === post.userId) {
      return 2;
    }
    return 0;
  }
}

export default getPermission;

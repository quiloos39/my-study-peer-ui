import isBrowser from "./is_browser";

function getLocalProfile() {
  if (isBrowser) {
    let data = window.localStorage.getItem("profile");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}

export default getLocalProfile;

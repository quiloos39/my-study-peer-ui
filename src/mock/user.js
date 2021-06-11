import mock from "./index";

mock.onPost("/api/user", { email: "a", password: "a" }).reply(200, {
  name: "Necdet",
  userid: 1,
  surname: "Efe",
  posts: [],
});

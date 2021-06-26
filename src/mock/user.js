import mock from "./index";

mock.onPost("/api/user/login", { email: "a", password: "a" }).reply(200, {
  token: "1",
  profile: {
    name: "Necdet",
    userid: 1,
    surname: "Efe"
  }
});

mock.onPost("/api/user/login", {email: "", password: ""}).reply(400);


import mock from "./index";

mock.onGet("/api/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

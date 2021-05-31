import mock from "./index";

mock.onGet("/api/announcements").reply(200, [
  {
    id: 1,
    title: "Brand new ui",
    desc: "Test",
  },
  {
    id: 2,
    title: "Brand new ui",
    desc: "Test",
  },
  {
    id: 3,
    title: "Brand new ui",
    desc: "Test",
  },
  {
    id: 4,
    title: "Brand new ui",
    desc: "Test",
  },
]);

import mock from "./index";

mock.onGet("/api/posts").reply(200, [
  {
    id: 1,
    title: "Looking for CNG 352 partner",
    creationDate: "02/06/2021",
    author: {
      id: 1,
      name: "Mustafa",
      surname: "Aygun",
    },
    desc: "I am looking for partner that will motivate me.",
    members: [
      {
        id: 1,
        name: "Necdet",
        surname: "Efe",
        university: "Middle east technical university",
        year: "3",
      },
      {
        id: 1,
        name: "Askar",
        surname: "Bozcan",
        university: "Middle east technical university",
        year: "3",
      },
    ],
    comments: [
      {
        id: 1,
        name: "Necdet",
        surname: "Efe",
        comment: "Amazing team mate had fun working with him.",
      },
      {
        id: 2,
        name: "Askar",
        surname: "Bozcan",
        comment: "Hello guys",
      },
    ],
  },
]);

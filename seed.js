const Campground = require("./models/campground");

async function createCamps() {
  const c1 = new Campground({
    title: "Backyard2",
    price: 33,
    location: "Saida",
    description:
      "The place is done in a delicate way, and respectful to nature. Very relaxing pool area overlooking the pine forest. We had a generous and tasty breakfast on the porch surrounded by pine trees, flowers, and plants. The only sounds were birds and “singing grasshopper. Staff is friendly and helpful. We are definitely coming back!! Thank you soo much for a well needed break",
    image:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGdyb3VuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    author: "62e185cc96c0696ac50b6549",
  });
  const c2 = new Campground({
    title: "Backyard3",
    price: 99,
    location: "Antelias",
    author: "62e185cc96c0696ac50b6549",
    description:
      "Super Easy Check In process, The Receptionists – were very friendly and informative about the place, and the facilities. we have found the guy on arrival to welcome us and show the TENT which we stayed in. Very Clean, very creative, fully serviced, Good Hot Water, honestly cannot make any negative comment on this facility. Nature Surrounds you all over, very quiet overnight, 3 minutes walking from the main restaurant which u should try  as the view from Top is Extravagance, and the Bon Fire Camp is 5 minutes from the restaurant. You need to pay extra for the Bonfire, where they provide you marshmallow, wood, and wine  however after 11 there Is no service  so you need to be able to handle the bonfire on your own or just dont pay from the beginning",
    image:
      "https://images.unsplash.com/photo-1564577160324-112d603f750f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  });
  const c3 = new Campground({
    title: "OurBackyardd",
    author: "62e185cc96c0696ac50b6549",
    price: 69,
    location: "Broumana",
    description:
      "I booked one month in advance by transferring a deposit by OMT. They declined to return my deposit even, after canceling before 12 days. There are no visible policies on cancelation on the website. Basically I was ripped off.",
    image:
      "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtcGdyb3VuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  });
  const c4 = new Campground({
    title: "Fourth Backyard",
    author: "62e185cc96c0696ac50b6549",
    price: 75,
    location: "Roma",
    description:
      "There is only one way to have an ideal vacation: choose the best place. Piani di Clodia will be your home away from home while you dedicate yourself to relaxing and having fun while enjoying nature in the 29 hectare park. Come discover Lake Garda and a corner of paradise in Lazise, located in the Province of Verona. Let yourself be spoilt by the lake's mild climate in a town steeped in hospitality and culture with attractions for all ages.At Piani di Clodia you will find a relaxed welcoming atmosphere that will make you feel right at home and you can choose the lodgings most suitable for your needs: camping, bungalow, or maxi caravan.",
    image:
      "https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXBncm91bmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  });
  await c1.save();
  await c2.save();
  await c3.save();
  await c4.save();
}

module.exports = createCamps;

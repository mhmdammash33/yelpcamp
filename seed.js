const Campground = require('./models/campground')

async function createCamps(){
    const c1 = new Campground({
      title: "Backyard2",
      price: "33$",
      location: "Saida",
      description:
        "The place is done in a delicate way, and respectful to nature. Very relaxing pool area overlooking the pine forest. We had a generous and tasty breakfast on the porch surrounded by pine trees, flowers, and plants. The only sounds were birds and “singing grasshopper. Staff is friendly and helpful. We are definitely coming back!! Thank you soo much for a well needed break",
    });
    const c2 = new Campground({
        title: 'Backyard3',
        price: '99$',
        location: 'Antelias',
        descripton: 'Super Easy Check In process, The Receptionists – were very friendly and informative about the place, and the facilities. we have found the guy on arrival to welcome us and show the TENT which we stayed in. Very Clean, very creative, fully serviced, Good Hot Water, honestly cannot make any negative comment on this facility. Nature Surrounds you all over, very quiet overnight, 3 minutes walking from the main restaurant which u should try  as the view from Top is Extravagance, and the Bon Fire Camp is 5 minutes from the restaurant. You need to pay extra for the Bonfire, where they provide you marshmallow, wood, and wine  however after 11 there Is no service  so you need to be able to handle the bonfire on your own or just dont pay from the beginning',
    })
    const c3 = new Campground({
      title: "OurBackyardd",
      price: "69$",
      location: "Broumana",
      description:
        "I booked one month in advance by transferring a deposit by OMT. They declined to return my deposit even, after canceling before 12 days. There are no visible policies on cancelation on the website. Basically I was ripped off.",
    });
    await c1.save();
    await c2.save();
    await c3.save();
}

module.exports = createCamps;
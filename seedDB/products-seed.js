const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------Coffee
  const coffee_titles = [
    "Mochamu Blend",
    "Paumaga Blend",
    "Sarabica Blend",
  ];
  const coffee_imgs = [
    "https://www.imghippo.com/images/1701598041.png",
    "https://www.imghippo.com/images/1701598189.png",
    "https://www.imghippo.com/images/1701598225.png",
  ];
  //----------------------Hot Cocoa
  const hot_cocoa_titles = [
    "French Vanilla",
    "Hazelnut",
    "Chocolate Supreme",
  ];
  const hot_cocoa_imgs = [
    "https://www.imghippo.com/images/1701599634.png",
    "https://www.imghippo.com/images/1701599664.png",
    "https://www.imghippo.com/images/1701599766.png",
  ];
  //----------------------Tea
  const tea_titles = [
    "Green Tea",
    "Chamomile Tea",
    "Black Tea",
  ];
  const tea_imgs = [
    "https://www.imghippo.com/images/1701598807.png",
    "https://www.imghippo.com/images/1701598760.png",
    "https://www.imghippo.com/images/1701598702.png",
  ];
  //----------------------Equipments
  const equipments_titles = [
    "Coffee Maker",
    "Coffee Grinder",
    "Coffee Essentials Set",
    "Espresso Machine Set",
  ];
  const equipments_imgs = [
    "https://www.imghippo.com/images/1701600513.png",
    "https://www.imghippo.com/images/1701600786.png",
    "https://www.imghippo.com/images/1701603177.png",
    "https://www.imghippo.com/images/1701601199.png",
  ];


  async function seedRawProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("##-##-####"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedRawProducts(coffee_titles, coffee_imgs, "Coffee");
  await seedRawProducts(hot_cocoa_titles, hot_cocoa_imgs, "Hot Cocoa");
  await seedRawProducts(tea_titles, tea_imgs, "Tea");
  await seedRawProducts(equipments_titles, equipments_imgs, "Equipments");


  await closeDB();
}

seedDB();

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/rawprod");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------Coffee Beans
  const coffee_beans_titles = [
    "Benguet Arabica Beans",
    "Bukidnon Tribal Robusta Beans",
    "Kapeng Barako Beans",
  ];
  const coffee_beans_imgs = [
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  //----------------------Cocoa Beans
  const cocoa_beans_titles = [
    "Criollo Beans",
    "Forastero Beans",
    "Trinitario Beans",
  ];
  const cocoa_beans_imgs = [
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  //----------------------Tea Leaves
  const tea_leaves_titles = [
    "Green Tea Leaves",
    "Chamomile Tea Leaves",
    "Black Tea Leaves",
  ];
  const tea_leaves_imgs = [
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  //----------------------Packaging
  const packaging_titles = [
    "Coffee Packaging",
    "Hot Cocoa Packaging",
    "Tea Packaging",
  ];
  const packaging_imgs = [
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          rawProductCode: faker.helpers.replaceSymbolWithNumber("##-##-####"),
          rawProductName: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 100, max: 500 }),
          stock: faker.random.number({min: 1, max: 100}),
          manufacturer: faker.company.companyName(0),
          inStock: true,
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

  await seedProducts(coffee_beans_titles, coffee_beans_imgs, "Coffee Beans");
  await seedProducts(cocoa_beans_titles, cocoa_beans_imgs, "Cocoa Beans");
  await seedProducts(tea_leaves_titles, tea_leaves_imgs, "Tea Leaves");
  await seedProducts(packaging_titles, packaging_imgs, "Packaging");

  await closeDB();
}

seedDB();

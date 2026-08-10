const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Wireless Noise-Cancelling Headphones",
        description: "Experience premium sound quality with active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
        price: 14999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        stock: 15,
    },
    {
        name: "Smart Fitness Watch",
        description: "Track your health metrics, heart rate, sleep quality, and daily activities with a sleek, waterproof smart watch.",
        price: 5499,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        stock: 25,
    },
    {
        name: "Premium Leather Jacket",
        description: "Classic black leather jacket crafted from soft lambskin leather. Features zippered pockets and a comfortable lining.",
        price: 7999,
        image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        stock: 10,
    },
    {
        name: "Classic Canvas Sneakers",
        description: "Lightweight, breathable canvas sneakers with durable rubber soles. Perfect for casual everyday wear.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        stock: 30,
    },
    {
        name: "Minimalist Desk Lamp",
        description: "Modern adjustable LED desk lamp with touch controls, multiple brightness levels, and color temperature modes.",
        price: 1899,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60",
        category: "Home",
        stock: 20,
    },
    {
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 handcrafted ceramic mugs with comfortable handles and a matte rustic finish. Dishwasher and microwave safe.",
        price: 999,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
        category: "Home",
        stock: 40,
    },
    {
        name: "Sleek Leather Wallet",
        description: "Genuine leather bi-fold wallet featuring RFID blocking technology, multiple card slots, and a clear ID window.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&auto=format&fit=crop&q=60",
        category: "Accessories",
        stock: 50,
    },
    {
        name: "Polarized Sunglasses",
        description: "Classic unisex sunglasses with polarized UV400 protection lenses and a durable lightweight frame.",
        price: 3199,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60",
        category: "Accessories",
        stock: 18,
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products from database.");

        // Insert new seeded products
        await Product.insertMany(products);
        console.log("Seeded database with default product catalog successfully.");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error.message);
        process.exit(1);
    }
};

seedProducts();

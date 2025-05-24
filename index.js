// const express = require('express'); 
// const users = require("./food.json"); 
// const app = express();
// const connectDB = require("./db/connect");
// app.use(express.json());

// const PORT = 8000;
// connectDB();
// // GET all users
// app.get("/api/users", (req, res) => {
//     return res.json(users);
// });

// // GET user by ID
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     if (user) {
//         return res.json(user);
//     } else {
//         return res.status(404).json({ message: "User not found" });
//     }
// });

// // POST new user
// app.post("/api/users", (req, res) => {
//     if (!req.body.email) {
//         return res.status(400).json({ error: "Email is required" });
//     }

//     const user = {
//         id: users.length + 1,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email
//     };



//     users.push(user);
//     return res.status(201).json(user);
// });


// app.put("/api/users/:id", (req, res) => {
//     const id = parseInt(req.params.id);  // get id from URL
//     const updatedData = req.body;        // get data from user
  
//     const index = users.findIndex(user => user.id === id);
//     if (index !== -1) {
//       users[index] = { ...users[index], ...updatedData };  // update data
//       res.json(users[index]);                              // send updated user
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   });




//   app.delete("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const index = users.findIndex((user) => user.id === id);
  
//     if (index !== -1) {
//       const deletedUser = users.splice(index, 1);
//       res.json(deletedUser[0]);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   });
  


  
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });



const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const MenuItem = require('./models/MenuItem');

app.use(express.json());

const PORT = 8000;

// Connect to MongoDB
connectDB();

// GET all menu items from MongoDB
app.get("/api/menuitems", async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET menu item by ID
app.get("/api/menuitems/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menuItem = await MenuItem.findOne({ id });
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new menu item
app.post("/api/menuitems", async (req, res) => {
  try {
    const { id, name, description, price, image, category } = req.body;
    if (!id || !name || !description || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await MenuItem.findOne({ id });
    if (existing) return res.status(400).json({ message: "Menu item with this id already exists" });

    const newMenuItem = new MenuItem({ id, name, description, price, image, category });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update menu item by ID
app.put("/api/menuitems/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedMenuItem = await MenuItem.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updatedMenuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/menuitems/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedMenuItem = await MenuItem.findOneAndDelete({ id });
    if (!deletedMenuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(deletedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

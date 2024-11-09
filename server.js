const express = require("express");
const app = express();
const port = 5000; 
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./models/users");


let uri = process.env.URI
mongoose.connect(uri)
    .then(() => {
        console.log("connected to database");

        app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on port ${port}`)
})

    })
    .catch((err) => { console.error("erorr connecting to database",err); })
    


app.get("/api/users", (req, res) => {
  user.find()
    .then((users) => {
      res.status(200).json(users); 
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving users", error: err });
    });
});

app.post("/api/users", (req, res) => {
  const users = [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
      address: "123 Main St, City, Country",
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
      role: "user",
      phoneNumber: "0987654321",
      address: "456 Oak St, City, Country",
    },
    {
      fullName: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
      role: "admin",
      phoneNumber: "1239876540",
      address: "789 Pine St, City, Country",
    },
    {
      fullName: "Alice Brown",
      email: "alice.brown@example.com",
      password: "password101",
      role: "user",
      phoneNumber: "5647382910",
      address: "101 Maple St, City, Country",
    },
    {
      fullName: "Charlie Green",
      email: "charlie.green@example.com",
      password: "password202",
      role: "admin",
      phoneNumber: "1010101010",
      address: "202 Birch St, City, Country",
    },
    {
      fullName: "David White",
      email: "david.white@example.com",
      password: "password303",
      role: "user",
      phoneNumber: "1234509876",
      address: "303 Cedar St, City, Country",
    },
    {
      fullName: "Eva Black",
      email: "eva.black@example.com",
      password: "password404",
      role: "admin",
      phoneNumber: "5678901234",
      address: "404 Elm St, City, Country",
    },
    {
      fullName: "Frank Blue",
      email: "frank.blue@example.com",
      password: "password505",
      role: "user",
      phoneNumber: "6543210987",
      address: "505 Redwood St, City, Country",
    },
    {
      fullName: "Grace Yellow",
      email: "grace.yellow@example.com",
      password: "password606",
      role: "user",
      phoneNumber: "7890123456",
      address: "606 Pineapple St, City, Country",
    },
    {
      fullName: "Henry Pink",
      email: "henry.pink@example.com",
      password: "password707",
      role: "admin",
      phoneNumber: "8901234567",
      address: "707 Lavender St, City, Country",
    },
  ];

  user.insertMany(users)
    .then(() => {
      res.status(201).json({ message: "Users successfully added!" });
    })
    .catch((err) => {
      console.error("Error adding users:", err);
      res.status(500).json({ message: "Error adding users", error: err });
    });
});


app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  user.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", updatedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error updating user", error: err });
    });
});



app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  user
    .findByIdAndDelete(userId)
    .then((removedUser) => {
      if (!removedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User deleted successfully", removedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error deleting user", error: err });
    });
});


app.post("/api/user", (req, res) => {
  const { fullName, email, password, role, phoneNumber, address } = req.body;

  const newUser = new user({
    fullName,
    email,
    password,
    role,
    phoneNumber,
    address,
  });

  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating user", error: err });
    });
});

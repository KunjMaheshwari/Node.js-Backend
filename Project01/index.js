const express = require("express");

const fs = require("fs");

// import the data from MOCK_DATA.json file 
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//REST API 
app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.get("/api/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users", (req, res)=>{
    // Create a new user
    const body = req.body;
    users.push({...body, id: users.length});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json({status: "pending"});
    })
    return res.json({status : "Successs"});
})

app.patch("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return res.status(404).json({ status: "error", message: "User not found" });

    users[userIndex] = { ...users[userIndex], ...updates };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Failed to update user" });
        res.json({ status: "success", data: users[userIndex] });
    });
});

app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return res.status(404).json({ status: "error", message: "User not found" });

    const deletedUser = users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Failed to delete user" });
        res.json({ status: "success", data: deletedUser[0] });
    });
});



app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
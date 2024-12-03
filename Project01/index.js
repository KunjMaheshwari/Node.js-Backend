const express = require("express");

// import the data from MOCK_DATA.json file 
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
    return res.json({status : "Pending"});
})

app.patch("/api/users/:id", (req, res) =>{
    // task: Edit the user with id
    return req.json({status: "pending"});
})

app.delete("/api/users/:id", (req, res) =>{
    return req.json({status: "pending"});
})


app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
const express = require("express");

const fs = require("fs");

// import the data from MOCK_DATA.json file 
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false })); // middleware and this is a built in middleware.
//this middleware basically converts all the data that we are getting from frontend to Objects.

// app.use((req, res, next) =>{ // next is the reference of the next middleware in our application.
//     console.log("Hello from Middleware M1");
//     // return res.json({msg : "Hello From Middleware M1"});
//     // req.myUserName = "kunjmaheshwari.dev";
//     next();
// })

// app.use((req, res, next) =>{ // Middleware 2
//     console.log("Hello from Middleware M2");
//     // return res.end("Hey");
//     next();
// })

app.use((res, req, next) => {
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}`,
        (err, data) => {
            next();
        }
    );
});

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
    res.setHeader("X-myName", "Kunj Maheshwari"); // added a Custom HTTP Header.
    // always add X to a custom header.
    return res.json(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({ msg: "Invalid id."});
    return res.json(user);
})

app.post("/api/users", (req, res) => {
    // Create a new user
    const body = req.body;
    // HTTP Status
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg : "All fields are required."});
    }
    users.push({ ...body, id: users.length });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "pending" });
    })
    return res.json({ status: "Successs" });
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
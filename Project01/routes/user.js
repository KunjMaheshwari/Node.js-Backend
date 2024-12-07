const express = require("express");

const {handleGetAllUsers} = require("../controllers/user");

const router = express.Router();

router.get("/", handleGetAllUsers);

// router.get("/", async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })

//REST API 
router.get("/", async (req, res) => {
    const allDbUsers = await User.find({});
    // res.setHeader("X-myName", "Kunj Maheshwari"); // added a Custom HTTP Header.
    // // always add X to a custom header.
    return res.json(allDbUsers);
})

router.get("/:id", async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Invalid id." });
    return res.json(user);
})

router.post("/", (req, res) => {
    // Create a new user
    const body = req.body;
    // HTTP Status
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    users.push({ ...body, id: users.length });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "pending" });
    })
    return res.json({ status: "Successs" });
})

router.patch("/:id", (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    // const deletedUser = users.splice(userIndex, 1);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //     if (err) return res.status(500).json({ status: "error", message: "Failed to delete user" });
    //     res.json({ status: "success", data: deletedUser[0] });
    // });
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    return res.status(201).json({ msg: "Success" });
});

module.exports = router;
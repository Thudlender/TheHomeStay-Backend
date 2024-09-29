const HomeStay = require("../models/homestay.model");

// Create and Save a new home stay
exports.create = async (req, res) => {
    const {name, type, imageUrl} = req.body;
    // Validate data
    if (!name || !type || !imageUrl) {
        res.status(400).send({
            message: "Name, Type or ImageUrl can not be empty!",
        });
        return;
    }

    await HomeStay.findOne({ where: { name: name } }).then((homestay) => {
        if (homestay) {
            res.status(400).send({
                message: "Home Stay already exists!",
            });
            return;
        }
        // Create a home stay
        const newHomeStay = {
            name: name,
            type: type,
            imageUrl: imageUrl,
        };
        HomeStay.create(newHomeStay).then((data) => {
            res.send(data);
        }).catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Something error occurred while creating the home stay.",
            });
        });
    });
};

// Get all home stays
exports.getAll = async (req, res) => {
    await HomeStay.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Something error occurred while fetching the home stays.",
            });
        });
};

// Get by ID
exports.getByid = async (req, res) => {
    const id = req.params.id;
    await HomeStay.findByPk(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "No Home Stay found with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Something error occurred while fetching the home stay.",
            });
        });
};

// Update a home stay
exports.update = async (req, res) => {
    const id = req.params.id;
    await HomeStay.update(req.body, {
        where: {
            id: id,
        },
    }).then((num) => {
        if (num === 1) {
            res.send({ message: "Home Stay was updated successfully" });
        } else {
            res.send({
                message: "Cannot update Home Stay with id=" +
                    id +
                    ". Maybe Home Stay was not found or req.body is empty!",
            });
        }
    })
    .catch((error) => {
        res.status(500).send({
            message:
                error.message ||
                "Something error occurred while updating the home stay.",
        });
    });
};

// Delete a home stay
exports.delete = async (req, res) => {
    const id = req.params.id;
    await HomeStay.destroy({ where: { id: id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Home Stay was deleted successfully" });
            } else {
                res.send({
                    message: "Cannot delete Home Stay with id=" + id + ".",
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Something error occurred while deleting the home stay.",
            });
        });
};



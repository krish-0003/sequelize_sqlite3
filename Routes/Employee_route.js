const express = require("express");
const router = express.Router();
const Employee = require("../Models/employee");
const Department = require("../Models/department");

router.delete("/delete_employee/:id", async function (req, res) {
  let { id } = req.params;
  await Employee.destroy({
    where: {
      id: id,
    },
  }).then((resp) => {
    res.json(resp);
  });
});

router.post("/create_employee", function (req, res) {
  Employee.create({
    name: req.body.name,
    Department_id: req.body.Department_id,
    age: req.body.age,
    address: req.body.address,
    joiningdate: req.body.joiningdate,
    bank_details: req.body.bank_details,
    salary: req.body.salary,
  }).then(
    (emp) => {
      const incrementResult = Department.increment("strength", {
        by: 1,
        where: { id: req.body.Department_id },
      });
      res.json(emp);
    },
    (validate) => {
      res.status(422).json({
        errors: validate.errors.map((e) => {
          return {
            attribute: e.path,
            message: e.message,
          };
        }),
      });
    }
  );
});

router.get("/employees", async function (req, res) {
  await Employee.findAll()
    .then((emp) => {
      res.json(emp);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/employee/:id", async function (req, res) {
  let { id } = req.params;
  await Employee.findByPk(id, {
    include: [Department],
  })
    .then((emp) => {
      if (emp) {
        res.json(emp);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/employee/:id", async function (req, res) {
  let { id } = req.params;
  await Employee.update({ name: req.body.name }, { where: { id: id } })
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/employees", async function (req, res) {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`,
        },
      },
    };
  }
  await Employee.findAll(filter)
    .then((emp) => {
      res.json(emp);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

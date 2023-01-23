const express = require("express");
const router = express.Router();
const Employee = require("../Models/employee");
const Department = require("../Models/department");

router.post("/create_department", function (req, res) {
  Department.create({
    name: req.body.name,
    code: req.body.code,
    head_name: req.body.head_name,
    subdepartment: JSON.stringify(req.body.subdepartment),
    strength: req.body.strength,
  }).then(
    (emp) => {
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

router.get("/departments", async function (req, res) {
  await Department.findAll()
    .then((d_emp) => {
      res.json(d_emp);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/department/:id", async function (req, res) {
  let { id } = req.params;
  await Department.findByPk(id, {
    include: [Employee],
  })
    .then((Dep) => {
      if (Dep) {
        res.json(Dep);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete_department/:id", async function (req, res) {
  let { id } = req.params;
  await Department.destroy({
    where: {
      id: id,
    },
  }).then((resp) => {
    res.json(resp);
  });
});

module.exports = router;

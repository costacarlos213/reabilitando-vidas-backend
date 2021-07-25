"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _CPF = require("./entities/User/CPF");

const router = (0, _express.Router)();
exports.router = router;
router.get("/", async (req, res) => {
  const cpf = _CPF.CPF.create("436.616.758-18");

  res.json({
    formatedNumber: cpf
  });
});
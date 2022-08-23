const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const puzzle =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidPuzzle =
  "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const solved =
  "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
const wrongChar =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9.T....1945....4.37.4.3..6..";
chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("#1", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, solved);

        done();
      });
  });
  test("#2", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .set("content-type", "application/json")
      .send({
        puzzle: "",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field missing");

        done();
      });
  });
  test("#3", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .set("content-type", "application/json")
      .send({
        puzzle: wrongChar,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");

        done();
      });
  });
  test("#4", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle + ".",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );

        done();
      });
  });
  test("#5", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .set("content-type", "application/json")
      .send({
        puzzle: invalidPuzzle,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Puzzle cannot be solved");

        done();
      });
  });
  test("#6", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        coordinate: "a1",
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, true);

        done();
      });
  });
  test("#7", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        coordinate: "a1",
        value: 6,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.conflict[0], "row");

        done();
      });
  });
  test("#8", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        coordinate: "a1",
        value: 9,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.conflict[0], "column");
        assert.equal(res.body.conflict[1], "region");

        done();
      });
  });
  test("#9", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field(s) missing");

        done();
      });
  });
  test("#10", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: wrongChar,
        coordinate: "a1",
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");

        done();
      });
  });
  test("#11", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle + ".",
        coordinate: "a1",
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );

        done();
      });
  });
  test("#12", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle + ".",
        coordinate: "a1",
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );

        done();
      });
  });
  test("#13", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        coordinate: "z1",
        value: 7,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid coordinate");

        done();
      });
  });
  test("#14", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .set("content-type", "application/json")
      .send({
        puzzle: puzzle,
        coordinate: "a1",
        value: 10,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid value");

        done();
      });
  });
});

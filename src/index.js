const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db/db");
const RulesService = require("./services/rules.service"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch((error) => console.error("Error syncing database:", error));

app.post("/rules", async (req, res) => {
  try {
    const { ruleString } = req.body;
    if (!ruleString) {
      return res.status(400).json({ error: "ruleString is required" });
    }
    const ast = await RulesService.createRule(ruleString);
    res.status(201).json(ast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/rules/combine", (req, res) => {
  const { rules } = req.body;
  if (!Array.isArray(rules) || rules.length === 0) {
    return res.status(400).json({ error: "Valid rules array is required" });
  }
  const combinedAST = RulesService.combineRules(rules);
  res.status(200).json(combinedAST);
});


app.post("/rules/evaluate", (req, res) => {
  const { node, data } = req.body;
  if (!node || !data) {
    return res.status(400).json({ error: "Node and data are required" });
  }
  const result = RulesService.evaluateRule(node, data);
  res.status(200).json({ result });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

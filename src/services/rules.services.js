const Rule = require("../../models/rule");
const Node = require("../../ast/ast.node");

class RulesService {
  async createRule(ruleString) {
    if (!ruleString || typeof ruleString !== 'string') {
      throw new Error("Invalid rule string");
    }
    
    const ast = this.parseRule(ruleString);
    await Rule.create({ rule_string: ruleString });
    return ast;
  }

  parseRule(ruleString) {
    return new Node("operand", null, null, ruleString);
  }

  combineRules(rules) {
    if (!Array.isArray(rules) || rules.length === 0) {
      throw new Error("Rules must be a non-empty array");
    }

    const combinedRoot = new Node("operator", null, null, "AND");
    let currentNode = combinedRoot;

    rules.forEach((rule, index) => {
      const ruleAst = this.parseRule(rule);
      if (!currentNode.left) {
        currentNode.left = ruleAst;
      } else {
        const newOperator = new Node("operator", currentNode.right || currentNode.left, null, "OR");
        currentNode.right = newOperator;
        newOperator.left = currentNode.right;
        newOperator.right = ruleAst;
        currentNode = newOperator;
      }
    });
    return combinedRoot;
  }

  evaluateRule(node, data) {
    if (!node) {
      throw new Error("Invalid AST node");
    }

    if (node.type === "operand") {
      return true;
    } else if (node.type === "operator") {
      const leftEval = this.evaluateRule(node.left, data);
      const rightEval = this.evaluateRule(node.right, data);
      return node.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
    }

    return false;
  }
}

module.exports = new RulesService();

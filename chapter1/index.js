const plays = require("./plays.json");
const invoices = require("./invoices.json");
const createStatementData = require("./createStatement");

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function statement(invoice, plays) {
  const data = createStatementData(invoice, plays);
  return renderPlainText(data);
}

function htmlStatement(invoice, plays) {
  const data = createStatementData(invoice, plays);
  return renderHtml(data);
}

function csvStatement(invoice, plays) {
  return renderCsv(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)} \n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>`;
  return result;
}

function renderCsv(data) {
  let result = "\n";
  for (let perf of data.performances) {
    result += ` ${perf.play.name},${perf.audience}\n`;
  }
  return result;
}

// Run the code
const result = statement(invoices[0], plays);
const resultHtml = htmlStatement(invoices[0], plays);

console.log(result);
console.log(resultHtml);

module.exports = {
  statement,
  htmlStatement,
  csvStatement,
};

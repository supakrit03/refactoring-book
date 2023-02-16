const plays = require("./plays.json");
const invoices = require("./invoices.json");
const invoices2 = require("./invoices2.json");
const { htmlStatement, statement, csvStatement } = require("./index");

test("Default Statement", () => {
  const result = statement(invoices[0], plays);
  expect(result).toMatch(`Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00 
You earned 47 credits`);
});

test("HTML Statement", () => {
  const resultHtml = htmlStatement(invoices[0], plays);
  expect(resultHtml).toMatch(`<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
 <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
 <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>`);
});

test("Enres Default Statement", () => {
  const result = statement(invoices2[0], plays);
  expect(result).toMatch(`Statement for BigCo
 Refactor: $100.00 (20 seats)
Amount owed is $100.00 
You earned 20 credits`);
});

test("Enres HTML Statement", () => {
  const resultHtml = htmlStatement(invoices2[0], plays);
  expect(resultHtml).toMatch(`<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Refactor</td><td>20</td><td>$100.00</td></tr>
</table>
<p>Amount owed is <em>$100.00</em></p>
<p>You earned <em>20</em> credits</p>`);
});

test("CSV Statement", () => {
  const result = csvStatement(invoices[0], plays);
  expect(result).toMatch(`
 Hamlet,55
 As You Like It,35
 Othello,40`);
});

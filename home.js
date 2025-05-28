async function loadStock() {
const res = await fetch('http://localhost:3000/stock');
const data = await res.json();
const list = document.getElementById('stockList');
list.innerHTML = '';
for (let item in data) {
const li = document.createElement('li');
li.textContent = ${item}: ${data[item]};
list.appendChild(li);
}
}
document.getElementById('sellForm').addEventListener('submit', async (e) => {
e.preventDefault();
const product = document.getElementById('product').value;
const quantity = parseInt(document.getElementById('quantity').value);
const res = await fetch('http://localhost:3000/sell', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ product, quantity })
});
const result = await res.json();
document.getElementById('alertMessage').textContent = result.alert || '';
document.getElementById('recommendation').textContent = result.recommendation
? Recommendation: Keep more stock of ${result.recommendation}
: '';
loadStock();
});
loadStock();

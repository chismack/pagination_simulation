let currentPage = 1;
const limit = 5;
let currentSearch = '';

const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

async function fetchProducts() {
  const res = await fetch(`/api/products?search=${currentSearch}&page=${currentPage}&limit=${limit}`);
  const json = await res.json();

  productList.innerHTML = '';
  json.data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    productList.appendChild(li);
  });

  pageInfo.textContent = `Page ${json.page} of ${json.totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === json.totalPages;
}

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.toLowerCase();
  currentPage = 1;
  fetchProducts();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchProducts();
});

fetchProducts();

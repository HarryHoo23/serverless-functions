const result = document.querySelector('.result')

const fetchProducts = async () => {
  result.innerHTML = `<h2>...Loading</h2>`
  try {
    const id = window.location.search;
    const data = await axios.get(`/api/3-product/${id}`);
    console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
}

fetchProducts();
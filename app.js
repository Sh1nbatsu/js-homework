const parent = document.querySelector("ul");

console.log(parent);

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/todos");

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const response = JSON.parse(xhr.responseText);
    for (let i = 0; i <= 20; i++) {
      parent.innerHTML += `<li>${response[i].title}</li>`;
    }
  } else {
    console.error("Ошибка при загрузке данных", xhr.status);
  }
};

xhr.send();
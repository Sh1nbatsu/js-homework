const div = document.querySelector("#parent-element");

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const resoponse = JSON.parse(xhr.responseText);
    div.innerHTML = `<p>${resoponse.title}</p>`;
  } else {
    console.error("Ошибка при получении запроса", xhr.status);
  }
};

xhr.send();

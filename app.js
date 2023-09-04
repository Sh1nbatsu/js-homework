const parentElement = document.querySelector(".container");

const xhr = new XMLHttpRequest();

function renderUserInfo(user, parentElement) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h3 class="name">${user.name}</h3>
  <p class="email">${user.email}</p>
  <p class="body">${user.body}</p>
  `;
  div.classList.add("user-info")
  parentElement.appendChild(div);
}

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
    for (let i = 0; i <= 9; i++) {
      renderUserInfo(response[i], parentElement);
    }
  } else {
    console.error("Произошла ошибка при запросе данных с сервера");
  }
};

xhr.open("GET", "https://jsonplaceholder.typicode.com/comments");

xhr.send();

// Exercize is fixed, while doing it first time i just followed next steps
// - обойти через цикл первые 10 элементов массива
// - вызвать функцию addInfo 3 раза: для добавления на страницу имени, имейла и комментария.
// in exercize description

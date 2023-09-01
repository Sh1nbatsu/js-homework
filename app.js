const parentElement = document.querySelector(".container");

const xhr = new XMLHttpRequest();

function addUserInfo(userInfo, HTMLTag, CSSClass) {
  const tag = document.createElement(`${HTMLTag}`);
  tag.classList.add(`${CSSClass}`);
  tag.textContent = userInfo;
  return tag;
}

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
    for (let i = 0; i <= 9; i++) {
      const div = document.createElement("div");
      div.classList.add("user-info");
      div.appendChild(addUserInfo(response[i].name, "h3", "name"));
      div.appendChild(addUserInfo(response[i].email, "p", "email"));
      div.appendChild(addUserInfo(response[i].body, "p", "body"));
      parentElement.appendChild(div);
    }
  } else {
    console.error("Произошла ошибка при запросе данных с сервера");
  }
};

xhr.open("GET", "https://jsonplaceholder.typicode.com/comments");

xhr.send();

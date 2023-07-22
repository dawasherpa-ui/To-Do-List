
const infoShowing = document.querySelectorAll("li");
const information = document.querySelector("#information");
// const information = document.querySelectorAll

// condition if the data is null then remove the list section
const section = document.querySelector(".sections")
const content = document.querySelector(".content");
const info = document.querySelector(".info");
const welcome = document.querySelector(".welcome");
const welcomePara = document.querySelector(".welcome p");
const form = document.querySelector("form");
const create = document.querySelector("#create-section");
const dataStore = localStorage.length;

// create button function
const computed = getComputedStyle(create);
function createBtn() {
    if (computed.display == "none") {
        create.style.display = "flex";
    } else {
        create.style.display = "none";
    }
}
if (dataStore == 0) {
    content.style.display = "none";
    section.style.gridTemplateColumns = "2fr";
    info.style.border = "none";
    information.style.display = "none"

} else {
    welcomePara.innerHTML = "Click on the list to know more.."
    content.style.display = "block";
    section.style.gridTemplateColumns = "1fr 2fr";
    info.style.border = "2px solid black";
    information.style.display = "none"
}
let count = localStorage.length;
function submitForm(event) {
    // event.preventDefault();
    count++
    for (let i = 0; i < 50; i++) {
        const title = document.querySelector("#title").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const txtArea = document.querySelector("#txtArea").value;

        // Create an object to hold the data
        const data = {
            title: title,
            date: date,
            time: time,
            txtArea: txtArea
        };

        // Convert the data object to JSON string
        const jsonData = JSON.stringify(data);

        // Save the JSON data in localStorage with title+count as the key
        localStorage.setItem(`title${count}`, jsonData);
    }

    console.log(localStorage.getItem(`title${count}`));
    create.style.display = "none";

}
//Calling a function during form submission.
form.addEventListener('submit', submitForm);
// condition of localstorage data

if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        const elemCreate = document.createElement("li");
        const jsonData = localStorage.getItem(`title${i + 1}`);
        const data = JSON.parse(jsonData);

        // Access the properties of the data object
        const title = data.title;

        // Create the content for the list item
        // const listItemContent = `${title}`;
        // const newContent = document.createTextNode(listItemContent);
        elemCreate.innerHTML = `<span>${title}</span> <div><input type="checkbox"  class="checkbox"/><i class="fas fa-trash-alt"></i>
        </div>`;
        content.appendChild(elemCreate);

    }
}
const li = document.querySelectorAll(".content li");

li.forEach((item, index) => {
    // Checkbox logic
    const checkbox = item.querySelector('.checkbox');
    const liIndex = item.querySelector('span');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            liIndex.style.textDecoration = "line-through";
        } else {
            liIndex.style.textDecoration = "none";
        }
    });

    // Trash icon function
    const trashIcon = item.querySelector('i');
    trashIcon.addEventListener('click', function () {
        localStorage.removeItem(`title${index + 1}`);
        item.remove();

        if (localStorage.length === 0) {
            window.location.reload(); // Reload the page to reset the DOM
        }
    });

    item.addEventListener("click", () => {
        const infoDiv = document.querySelector("#information");
        const jsonData = localStorage.getItem(`title${index + 1}`);
        const data = JSON.parse(jsonData);

        // Access the properties of the data object
        const date = data.date;
        information.style.display = "block";
        welcome.style.display = "none";
        infoDiv.innerHTML = ""; // Clear previous content

        infoDiv.innerHTML += `<h2>${data.title}</h2>
      <p class="infoDate">You set the reminder at <strong>${data.date}</strong> in <strong>${data.time}</strong></p>
      <div class="infoText">Description : <div><strong>${data.txtArea}</strong></div></div>`;

        console.log(index);
    });
});


const searchInput = document.getElementById('searchInput');
const contentList = document.querySelector('.content');
const listItems = contentList.getElementsByTagName('li');
searchInput.addEventListener('input', function (event) {
    const searchText = event.target.value.toLowerCase();

    Array.from(listItems).forEach(function (listItem) {
        const text = listItem.innerText.toLowerCase();

        if (text.includes(searchText)) {
            listItem.style.display = 'flex';
        } else {
            listItem.style.display = 'none';
        }
    });
});



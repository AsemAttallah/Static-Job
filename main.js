import data from "./data.json" assert { type: "json" };
const resultContainer = document.querySelector(".resultContainer"); //posts-div
const searchSelected = document.querySelector(".search-selected"); //labels-section
const searchValue = document.querySelector(".searchBar-inputField"); // text-input
const noResult = document.querySelector(".noResult");

// let uniquefined = new Set();
let uniqueFindsArray = [];
let renderedData = [];

function fillterData(data) {
  data.map((el) => {
    const filltered = [
      el.level.toLowerCase(),
      el.role.toLowerCase(),
      ...el.languages.map((lang) => lang.toLowerCase()),
      ...el.tools.map((tool) => tool.toLowerCase()),
    ];
    uniqueFindsArray = searchBarChanges(filltered).map((el) =>
      el.toLowerCase()
    );
    const fillteredResult = uniqueFindsArray.every((element) =>
      filltered.includes(element)
    );
    if (fillteredResult) {
      renderedData.push(el);
    }
  });
  renderAll(renderedData);
}
fillterData(data);

function searchBarChanges() {
  searchValue.addEventListener("keydown", (event) => {
    if (event.keyCode == "13") {
      const addfilter = document.createElement("h4");
      addfilter.classList.add("addfilter");
      if (!uniqueFindsArray.includes(searchValue.value)) {
        addfilter.innerText = searchValue.value;
        searchSelected.appendChild(addfilter);
        uniqueFindsArray.push(searchValue.value);
        fillterData(data);
      }
      addfilter.addEventListener("click", () => {
        const textToRemove = addfilter.innerText;
        const indexToRemove = uniqueFindsArray.indexOf(textToRemove);
        uniqueFindsArray.splice(indexToRemove, 1);
        addfilter.remove();
        fillterData(data);
      });
    }
  });
  return uniqueFindsArray;
}

function renderAll(data) {
  resultContainer.innerHTML = "";
  renderedData = [];
  if (data.length == 0) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }

  data.map((el) => {
    // create
    const containerLandR = document.createElement("div");
    containerLandR.classList.add("containerLandR-class");
    const RightContainer = document.createElement("div");
    RightContainer.classList.add("RightContainer-class");
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("leftContainer-class");

    const image = document.createElement("img");
    image.classList.add("image-class");
    const allInfo = document.createElement("div");
    allInfo.classList.add("allInfo");
    const firstLine = document.createElement("div");
    firstLine.classList.add("firstLine-class");

    const company = document.createElement("h3");
    company.classList.add("company-class");
    const isNew = document.createElement("p");
    isNew.classList.add("isNew-class");
    const isFeatured = document.createElement("p");
    isFeatured.classList.add("isFeatured-class");

    const position = document.createElement("h2");
    position.classList.add("position-class");

    const lastLine = document.createElement("div");
    lastLine.classList.add("lastLine-class");

    const dot = document.createElement("p");
    const dot2 = document.createElement("p");
    const postedAt = document.createElement("p");
    const contract = document.createElement("p");
    const location = document.createElement("p");

    const role = document.createElement("h4");
    role.classList.add("right-elements");
    const level = document.createElement("h4");
    level.classList.add("right-elements");

    /// add data
    //left
    image.src = el.logo;
    company.innerText = el.company;
    el.new == true
      ? (isNew.innerText = "NEW!")
      : (isNew.style.display = "none");
    el.featured == true
      ? (isFeatured.innerText = "FEATURED!")
      : (isFeatured.style.display = "none");
    position.innerText = el.position;
    dot.innerText = "-";
    dot2.innerText = "-";
    postedAt.innerText = el.postedAt;
    contract.innerText = el.contract;
    location.innerText = el.location;

    //right
    role.innerText = el.role;
    level.innerText = el.level;

    // append
    //left
    leftContainer.appendChild(image);
    firstLine.appendChild(company);
    firstLine.appendChild(isNew);
    firstLine.appendChild(isFeatured);

    lastLine.appendChild(postedAt);
    lastLine.appendChild(dot);
    lastLine.appendChild(contract);
    lastLine.appendChild(dot2);
    lastLine.appendChild(location);

    allInfo.appendChild(firstLine);
    allInfo.appendChild(position);
    allInfo.appendChild(lastLine);
    leftContainer.appendChild(allInfo);
    containerLandR.appendChild(leftContainer);

    //right
    RightContainer.appendChild(role);
    RightContainer.appendChild(level);

    for (let i = 0; i < el.languages.length; i++) {
      const languages = document.createElement("h4");
      languages.classList.add("right-elements");
      languages.innerText = el.languages[i];
      RightContainer.appendChild(languages);
    }

    for (let i = 0; i < el.tools.length; i++) {
      const tools = document.createElement("h4");
      tools.innerText = el.tools[i];
      tools.classList.add("right-elements");
      RightContainer.appendChild(tools);
    }

    containerLandR.appendChild(RightContainer);
    resultContainer.appendChild(containerLandR);
  });
}

const searchSelected = document.querySelector(".search-selected"); //labels-section
const searchValue = document.querySelector(".searchBar-inputField"); // text-input

const noResult = document.querySelector(".noResult");
const numResult = [];

const uniquefined = new Set();

console.log(searchValue.value);
const resultContainer = document.querySelector(".resultContainer"); //posts-div
async function render() {
  const getData = async () => {
    const res = await fetch("data.json");
    const data = await res.json();
    return data;
  };
  const data = await getData();
  console.log(data);

//   fillteredDAta=data.map((el)=>{

//   })

  data.map((el) => {
    // all posts with HTML and correct Data (waiting to add to DOM)
    const allvalues = [];
    // create
    const containerLandR = document.createElement("div"); // include left and right side
    containerLandR.classList.add("containerLandR-class");
    const RightContainer = document.createElement("div"); // just loop for a some feild to fill it
    RightContainer.classList.add("RightContainer-class");
    const leftContainer = document.createElement("div"); // include all left side in the card
    leftContainer.classList.add("leftContainer-class");

    const image = document.createElement("img");
    image.classList.add("image-class");
    const allInfo = document.createElement("div"); // all without image
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
    // const languages=document.createElement("p");
    // const tools=document.createElement("p");

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
    allvalues.push(el.role);
    level.innerText = el.level;
    allvalues.push(el.level);

    finder(searchValue, allvalues, containerLandR); // display: none??
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
      allvalues.push(el.languages[i]);
      RightContainer.appendChild(languages);
    }

    for (let i = 0; i < el.tools.length; i++) {
      const tools = document.createElement("h4");
      tools.innerText = el.tools[i];
      allvalues.push(el.tools[i]);
      tools.classList.add("right-elements");
      RightContainer.appendChild(tools);
    }

    containerLandR.appendChild(RightContainer);
    resultContainer.appendChild(containerLandR);
  });
}
render();


function finder(searchValue, allvalues, containerLandR) {

  searchValue.addEventListener("change", () => {
    // textbox listener
    //   console.log(allSearchValues);
    if (allvalues.includes(searchValue.value)) {
      // To add the new label to label section and store it in the SET.
      const addfilter = document.createElement("h4");
      addfilter.classList.add("addfilter");
      //   allSearchValues.push(searchValue.value)
      if (!uniquefined.has(searchValue.value)) {
        addfilter.innerText = searchValue.value;
        searchSelected.appendChild(addfilter);
        uniquefined.add(searchValue.value);
      }

      addfilter.addEventListener("click", () => {
        addfilter.remove();
        uniquefined.delete(searchValue.value);
        console.log("cheeeck", uniquefined);
        finder(searchValue, allvalues, containerLandR);
        // render();
        // checkAll(uniquefined);
      });

      function checkAll(uniquefined) {
        console.log(uniquefined);
        const uniqueNumbersArray = [...uniquefined];
        // numResult.push(uniqueNumbersArray);
        console.log("arr", uniqueNumbersArray);
        const allIncluded = uniqueNumbersArray.every((element) =>
          allvalues.includes(element)
        );
        console.log("aaaaaaaaaaaa", allIncluded); // const allIncluded = true;
        if (allIncluded) {
          console.log(true); // All elements in 'a' are included in 'b'
          containerLandR.style.display = "flex";
        } else {
          console.log("are we here??");
          containerLandR.style.display = "none";
        }
      }
      checkAll(uniquefined);
    } else {
      // searchValue.value=""
      containerLandR.style.display = "none";
    }
  });
}

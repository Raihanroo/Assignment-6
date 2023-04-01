const loadApi = () => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayApi(data.data.tools));
}


const displayFeature = (data) => {
  let featureList = '';
  for (const singleData of data) {
    featureList += `<li>${singleData}</li>`
  }
  return featureList;
}

const displayApi = data => {
  // console.log(data);
  // step 1 : container element
  const toolscontainer = document.getElementById('tools-container');
  data.forEach(tool => {
    console.log(tool)
    // step 2: create child for each element
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
    // step-3 set content of the child 

    toolDiv.innerHTML = `
        <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="...">
          <ol class="feature-container">
        
          </ol>
        <div class="card-body">
          <p class="card-text">
          <h5>Feature</h5>
            <ol>
              ${displayFeature(tool.features)}
            </ol>
          </p>
          <hr>
          <div class="d-flex justify-content-between">
            <div >
              <h5 class="card-title">${tool.name}</h5>
              <h6>  ${tool.published_in}</h6>
            </div>
            <button onclick = showDetail(${tool}) >Details</button>
          </div>
        </div>
        
      </div>
        `
    // const featureList = document.createElement('li');

    // tool.features.forEach(item =>{
    //   featureList.innerHTML = `
    //   <li>${item}</li>
    //   `
    // })
    // document.querySelector(".feature-container").appendChild(featureList);
    // step-4: appendChild

    toolscontainer.appendChild(toolDiv);
  })
}

loadApi();
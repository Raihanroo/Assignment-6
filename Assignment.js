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


const modalDataPush = data =>{
  console.log(data.data.pricing);
  document.getElementById('modal-title').innerHTML= data.data.description  
 const modalImg =  document.getElementById('modal-img')
 modalImg.setAttribute('src', data.data.image_link[0])
 const modalFeature = document.getElementById('modal-feature')
 const li = Object.values(data.data.features).map((feature) => `
 <li>${feature.feature_name}</li>
 `)
 modalFeature.innerHTML = li.join("")

 const modalIntegration = document.getElementById('modal-Integration')
 const ul = (data.data.integrations).map((integrations) => `
 <li>${integrations}</li>
 ` ) 
  modalIntegration.innerHTML = ul.join('')

const modalCost = document.getElementById('modal-cost')
const freeCost = data.data.pricing.map((price) => `
<div style="height: 100px; width: 120px; background-color: rgb(255, 255, 255);" class="text-center d-flex align-items-center justify-content-center p-2">${price.price}<br>${price.plan}</div>
`)
 modalCost.innerHTML = freeCost.join('')

}


const showDetails = id =>{
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then(res => res.json())
  .then(data => modalDataPush(data));
}




const displayApi = data => {
  // console.log(data);
  // step 1 : container element
  const toolscontainer = document.getElementById('tools-container');
  data.forEach(tool => {
    // console.log(tool)
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
              <h6><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</h6>
            </div>
            <button style="background-color: #ff8e794f;  padding: 20px; border-radius: 50%; color: red; border: none;" onclick=showDetails('${tool.id}') data-bs-toggle="modal" data-bs-target="#showDetail"><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
        `
        
      //  document.getElementById('showDetail').addEventListener()

    toolscontainer.appendChild(toolDiv);
  })
}

loadApi();


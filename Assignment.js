const loadApi = () => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayApi(data.data.tools.slice(0,6)));
}

// shortDate button API work
const sortDate = async () =>{  // async await function 
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const loadData = await fetch(url);
  const reciveData = await loadData.json()
  const daTa = reciveData.data.tools
  console.log(daTa);
  daTa.sort((a,b) =>{
    return new Date(a.published_in) - new Date(b.published_in);
  
  })
  console.log(daTa);

  displayApi(daTa);
}



const displayFeature = (data) => {
  let featureList = '';
  for (const singleData of data) {
    featureList += `<li>${singleData}</li>`
  }
  return featureList;
}


// see more button
const showAllUniverses =  () => {
  document.getElementById('spinner').classList.remove('d-none'); //spinee remove
  document.getElementById('spinner').classList.add('d-block');  // spinner step-2
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url)
  .then(res => res.json())
  .then(data => displayApi(data.data.tools));

  // show all button 
const button = document.getElementById("button-all");
button.classList.add("d-none");

}

const modalDataPush = data =>{
  console.log(data.data);
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
<div style="height: 100px;  width: 120px; background-color: rgb(255, 255, 255);" class="text-center d-flex align-items-center justify-content-center p-2">${price.price}<br>${price.plan}</div>
`)
 modalCost.innerHTML = freeCost.join('')

const firstTitle = document.getElementById('first-title')
const modalDescription = document.getElementById('second-title')
firstTitle.innerHTML = data.data.tool_name
modalDescription.innerHTML = data.data.description

// accuracy
document.querySelector('.accuracy').innerHTML = Math.parseFloat(data.data.accuracy.score)


}


const showDetails = id =>{
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then(res => res.json())
  .then(data => modalDataPush(data));
}


const displayApi = data => {
  // console.log(data);
  document.getElementById('spinner').classList.add('d-none');   //spinner-1
  // step 1 : container element
  const toolscontainer = document.getElementById('tools-container');
  toolscontainer.innerHTML = '';
  data.forEach(tool => {
    // console.log(tool)
    // step 2: create child for each element
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col-12', 'col-md-4');
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


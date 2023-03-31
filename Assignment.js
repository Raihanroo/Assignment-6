const loadApi = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayApi(data.data.tools));
}


const displayApi = data =>{
    // console.log(data);
    // step 1 : container element
    const toolscontainer = document.getElementById('tools-container');
    data.forEach(tool =>{
        console.log(tool)
        // step 2: create child for each element
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        // step-3 set content of the child 

        toolDiv.innerHTML = `
        <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${tool.name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `

        // step-4: appendChild
        
        toolscontainer.appendChild(toolDiv);
    })
}

loadApi();
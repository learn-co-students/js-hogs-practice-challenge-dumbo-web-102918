const containerDiv = document.getElementById('hog-container');
const submit = document.querySelector('[type="submit"]');
const inputName = document.getElementsByName('name')[0];
const inputSpec = document.getElementsByName('specialty')[0];
const inputMedal = document.getElementsByName('medal')[0];
const inputWeight = document.getElementsByName('weight')[0];
const inputImageUrl = document.getElementsByName('img')[0];
const inputGreased = document.getElementsByName('greased')[0];

submit.addEventListener('click', createNewHog);

  // body...
  fetch('http://localhost:3000/hogs')
    .then(res => res.json())
    .then(data => displayAllHogs(data))

function displayAllHogs (data) {
  for(let hog of data){
    let ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    let divHog = document.createElement('div');
    divHog.setAttribute('class', "hog-card")
    for(let key in hog){
      let li = document.createElement('li');

      if(key === 'id'){
        li.remove();
        divHog.setAttribute('id', hog[key]);
      }else if(key === 'image') {
        li.innerHTML = `<img src = ${hog[key]}>`
      }else if(key === 'greased'){
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = hog[key];
        checkbox.value = hog[key];
        checkbox.innerText = 'greased';
        checkbox.addEventListener('change', updateGrease)
        li.append(checkbox)

      }else{
        li.innerHTML=`<span>${key}: ${hog[key]}</span>`

      }
      ul.appendChild(li)
    }
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete Me";
    deleteButton.addEventListener('click', deleteHog);
    divHog.appendChild(ul)
    divHog.appendChild(deleteButton);
    containerDiv.append(divHog);
  }
}

//Create New Hog
function createNewHog (e) {
  e.preventDefault();
  console.log("hello from New Button");
  // body...
  let newHog = {
    name:inputName.value,
    specialty:inputSpec.value,
    greased:inputGreased.checked,
    'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water':parseInt(inputWeight.value),
    'highest medal achieved':inputMedal.value,
    image:inputImageUrl.value
  }
  // console.log(newHog);
  fetch('http://localhost:3000/hogs',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(newHog)
  }).then(()=>{
    location=location
  })
}

function deleteHog (e) {
  // body...
  let id = e.target.parentNode.id;
  // console.log(id);
  fetch(`http://localhost:3000/hogs/${id}`,{
    method: 'DELETE'
  })
  e.target.parentNode.remove();

}

function updateGrease (e) {
  // body...
  // console.log(e.target.parentNode.parentNode.parentNode);
  let id = e.target.parentNode.parentNode.parentNode.id;
  console.log(id);
  fetch(`http://localhost:3000/hogs/${id}`,{
    method: 'PATCH',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({greased:e.target.checked})
  })
}

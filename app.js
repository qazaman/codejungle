let noteCount = 0;
let url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';



class Note {

  constructor(string) {
    this.string = string;
    
  }

  get string() {
    return this._description;
  }

  set string(string) {
    if (string.length < 1) {
    alert("invalid note!");
    return;}
    this._description = string;
  }

  

}

function makeNote(string) {
  let note = new Note(string);
   return "<br>" + note.string;

};



function deleteSquare(noteId) {
  const div = document.getElementById(`note${noteId}`);
  const parentDiv = div.parentElement;
  parentDiv.removeChild(div);
}

function createSquare(size) {
noteCount++;
const div = document.getElementById("stickyNoteBox");
div.insertAdjacentHTML("afterbegin", ` <div class = "note" id="note${noteCount}" >
<input class="buttonDelete" type="button" value="" onclick=" deleteSquare(${noteCount})" />
<p>${makeNote(prompt("enter note:"))}</p>
</div>`);

  
}

async function showAvatar() {

  // read our JSON
  let response = await fetch('https://javascript.info/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/qazaman`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "my github logo";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}


//setInterval(() => elem.hidden = !elem.hidden, 1000);



function logList() {
  for (let li of document.querySelectorAll('li')) {
    let title = li.firstChild.data;
    console.log(title);
  
  
  }

  return console.log("complete");
}

function showTime() {

  let dateTime= new Date();
  let time = dateTime.toLocaleTimeString();
  var timee = document.querySelector('#timee');
  timee.textContent = time;

}

function makeList() {
  const div = document.getElementById("recieptList");
let ul = document.createElement('ul');
div.append(ul);

while (true) {
  let data = prompt("Enter the text for the list item", "");

  if (!data) {
    break;
  }

  let li = document.createElement('li');
  li.textContent = data;
  ul.append(li);
}
}

async function fetchData(url) {

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json_data = await response.json();
    return json_data;
    
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }



}

fetchData(url)
  .then(data2 => {
    // Within this .then() block, you can define 'globalVariable'
    data = data2;

    // You can also use 'globalVariable' here
    console.log(data);
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

function createTreeText(data) {



  let ul = document.createElement('ul');

  for (let key in data) {
    let li = document.createElement('li');
    li.innerHTML = key;

    let childrenUl = createTreeText(data[key]);
    if (childrenUl) {
      li.append(childrenUl);
    }

    ul.append(li);
  }

  return ul;
}

function createTree(container,obj) {
  container.append(createTreeText(obj))
}
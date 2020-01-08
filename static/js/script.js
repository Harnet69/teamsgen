window.onload = function() {
    dragula([document.getElementById('left'), document.getElementById('right')]);
};

const listOfAllMembers = [];

const form = document.querySelector('form');
const ol = document.querySelector('ol');
const numberOfMembers = document.querySelector('h4 span');
const listName = document.getElementsByClassName('memberName');
const input = document.querySelector('input');
const genButton = document.getElementById('generate');

const removeName = (e) => {
    const index = e.target.parentNode.dataset.key;
    listOfAllMembers.splice(index, 1);
    numberOfMembers.textContent = listOfAllMembers.length;
    renderList();
};

const clickedDelButton = (e) => {
    let opacity =1;
    let timeOut = setInterval(function () {
        genButton.style.opacity = opacity;
        opacity -= 0.03;
        if(opacity <= 0){
            clearInterval(timeOut);
            console.log('STOP');
        }
    },10);

};


const addTask = (e) => {
    e.preventDefault();
    const memberName = input.value;
    if (memberName === "") return alert('Write name!');
    const newName = document.createElement('li');
    newName.className = 'memberName';
    newName.innerHTML = memberName + "<button>Remove</button>";
    listOfAllMembers.push(newName);
    renderList();
    ol.appendChild(newName);
    input.value = '';
    numberOfMembers.textContent = listName.length;
    newName.querySelector('button').addEventListener('click', removeName);
}

const renderList = () => {
    ol.textContent = '';
    listOfAllMembers.forEach((singleMember, index) => {
        singleMember.dataset.key = index;
        ol.appendChild(singleMember);
    });
}

form.addEventListener('submit', addTask);
genButton.addEventListener('click', clickedDelButton);

const buttonGenerator = document.querySelector('#generate');
const randomizer = document.querySelector('div.randomize')

const groupGenerator = () => {
    const randomIndex = Math.floor(Math.random() * listOfAllMembers.length);

    randomizer.textContent = `Groups list ${listOfAllMembers[randomIndex].textContent}`;
}

buttonGenerator.addEventListener('click', groupGenerator);
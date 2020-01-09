window.onload = function() {
        dragula([document.getElementById('left'), document.getElementById('right'), document.getElementsByClassName('randomize').lastElementChild]);

    const listOfAllMembers = [];


const form = document.querySelector('form');
const ol = document.querySelector('ol');
const numberOfMembers = document.querySelector('h4 span');
const listName = document.getElementsByClassName('memberName');
const input = document.querySelector('input.name');
let inputNumberOfMembers = document.querySelector('input.NumberOfMembers');
const divRandom = document.querySelector('div.randomize')

const removeName = (e) => {
    const index = e.target.parentNode.dataset.key;
    listOfAllMembers.splice(index, 1);
    numberOfMembers.textContent = listOfAllMembers.length;
    renderList();
}

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
    let nameDiv = document.createElement('div');
        nameDiv.classList.add('member_name');
    listOfAllMembers.forEach((singleMember, index) => {
        singleMember.dataset.key = index;
        document.getElementById('ol').appendChild(nameDiv);
        nameDiv.appendChild(singleMember);
    });
}

form.addEventListener('submit', addTask)

let buttonGenerator = document.querySelector('#generate');

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue;
    while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let showRandomList = () => {
    let randomArray = shuffle(listOfAllMembers);
    let numberOfMember = inputNumberOfMembers.value;
    if (numberOfMember === '') return alert('fill member number');
    let result = randomArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / numberOfMember);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        elemDisapp(buttonGenerator);
        elemDisapp(inputNumberOfMembers);
        return resultArray;
    }, [])

    result.forEach(function (element) {
        const ul = document.createElement('ul');
        ul.innerHTML = 'Group: '
        divRandom.appendChild(ul);
        element.forEach(function (nameElement) {
            nameRemove = nameElement.textContent;
            name = nameRemove.replace('Remove', '')
            const li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML = li.innerHTML + name;
        });
    });

}

// Vital's peace of cake
// slowly disappear element
function elemDisapp(genButton){
    let opacity =1;
    let timeOut = setInterval(function () {
        genButton.style.opacity = opacity;
        opacity -= 0.005;
        if(opacity <= 0){
            clearInterval(timeOut);
            genButton.removeEventListener("click", showRandomList);
            genButton.remove();
            document.getElementById('left').remove();
            document.getElementById('right').style.width = '100%';
        }
    },1);

}


buttonGenerator.addEventListener('click', showRandomList);

};


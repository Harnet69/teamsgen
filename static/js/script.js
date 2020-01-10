window.onload = function() {
    dragula([document.getElementById('left'), document.getElementById('right')]);
};

let memberNum = 0;

// slowly disappear element
function elemDisapp(genButton){
    let opacity =1;
    let timeOut = setInterval(function () {
        genButton.style.opacity = opacity;
        opacity -= 0.005;
        if(opacity <= 0){
            clearInterval(timeOut);
            // let genButtonForDelete = document.getElementById('generate');
            genButton.removeEventListener("click", elemDisapp);
            genButton.remove();
        }
    },1);

}

// add event click to a generate button
function genButton() {
    const genButton = document.getElementById('generate');
    genButton.addEventListener('click', function () {
        elemDisapp(genButton); // gen button disappear
        createResult(addMembsToArr()); // get users names, shuffle and display
    });
}

// add action to input field
function addMemberInputField() {
    let addMemberInput = document.querySelector('#add_member_input');
    addMemberInput.addEventListener('keyup', function () {
         if (event.keyCode === 13) { // if 'Enter' was pressed on a input field
            addMemberRecord(addMemberInput.value);
         }
    });
}

// add member with button add
function addMemberButton() {
    let addMemberButton = document.querySelector('#add_btn');
    addMemberButton.addEventListener('click', function () {
        let memberNameInputField = document.querySelector('#add_member_input');
        addMemberRecord(memberNameInputField.value);
    });
}

// create a new user information div
function addMemberRecord(memberName) {
    let memberDispHTML = "<label class='member_name_for_arr' id='member"+memberNum+"_name'>"+memberName+"</label><img class='del_button' id='del"+memberNum+"Button' src=\"/static/img/del_btn.png\" alt=\"\">";
    let usersUl = document.getElementById('listOfMembers');
    let usersli = document.createElement('div');
    usersli.classList.add();
    usersli.setAttribute('id', 'member'+memberNum+'_name'); // give id to div for deletion
    usersli.innerHTML = memberDispHTML;
    usersUl.appendChild(usersli);
    delMember(memberNum);
    memberNum++;
    clearInputField();
}

// add members list to array
function addMembsToArr() {
    let membNames = document.getElementsByClassName('member_name_for_arr');
    let membersNames = [];
    for(let member_name of membNames){
        membersNames.push(member_name.textContent);
    }
    shuffledMembersNames = shuffle(membersNames);
    return shuffledMembersNames;
}

// shuffle members names array
function shuffle(arrForShuffle) {
    return arrForShuffle.sort(() => Math.random() - 0.5);
}

// create and display shuffled list of names
function createResult(membNamesArr) {
    // let membDiv = document.createElement('div');
    let rightDiv = document.getElementById('right')
    let membUl = document.createElement('ul');
    rightDiv.appendChild(membUl);
    for(let membName of membNamesArr){
        let membLi = document.createElement('li');
        membLi.textContent = membName;
        membUl.appendChild(membLi);
    }

}

// clear input field after adding a record
function clearInputField() {
    let addMemberInput = document.querySelector('#add_member_input');
    addMemberInput.value = '';
}

// add listener to delete member
function delMember(memberNum) {
    let delButton = document.getElementsByClassName('del_button');
    delButton[memberNum].addEventListener('click', function () {
        let delDiv = document.getElementById('member'+memberNum+'_name');
        elemDisapp(delDiv);
    });
}


function main() {
    genButton();
    addMemberInputField();
    addMemberButton();
}

main();
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
            let genButtonForDelete = document.getElementById('generate');
            genButtonForDelete.removeEventListener("click", elemDisapp);
            genButtonForDelete.remove();
            console.log('STOP');
        }
    },1);

}

// add event click to a generate button
function genButton() {
    const genButton = document.getElementById('generate');
    genButton.addEventListener('click', function () {
        elemDisapp(genButton);
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
    let memberDispHTML = "<label id='member"+memberNum+"_name'>"+memberName+"</label><img class='del_button' id='del"+memberNum+"Button' src=\"/static/img/del_btn.png\" alt=\"\">";
    let usersUl = document.getElementById('listOfMembers');
    let usersli = document.createElement('div');
    usersli.classList.add('member_name');
    usersli.innerHTML = memberDispHTML;
    usersUl.appendChild(usersli);
    memberNum++;
    clearInputField();
    delMember();
}

// clear input field after adding a record
function clearInputField() {
    let addMemberInput = document.querySelector('#add_member_input');
    addMemberInput.value = '';
}

// add listener to delete member
function delMember() {
    let delButton = document.getElementsByClassName('del_button');
    delButton[0].addEventListener('click', function () {
        console.log(delButton[0].getAttribute('id'));
    });
}


function main() {
    genButton();
    addMemberInputField();
    addMemberButton();
}

main();
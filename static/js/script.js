window.onload = function() {
    dragula([document.getElementById('left'), document.getElementById('right')]);
};

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
function addMemberInputField(memberNum) {
    let addMemberInput = document.querySelector('#add_member_input');
    addMemberInput.addEventListener('keyup', function () {
         if (event.keyCode === 13) { // if 'Enter' was pressed on a input field
            addMemberRecord(addMemberInput.value, memberNum);
         }
    });
}

// add member with button Add
function addMemberButton(memberNum) {
    let addMemberButton = document.querySelector('#add_btn');
    addMemberButton.addEventListener('click', function () {
        let memberNameInputField = document.querySelector('#add_member_input');
        addMemberRecord(memberNameInputField.value, memberNum);
    });
}

// create a new user information div
function addMemberRecord(memberName, memberNum) {
    let memberDispHTML = "<label id='member"+memberNum+"_name'>"+memberName+"</label><img id='del"+memberNum+"Button' src=\"/static/img/del_btn.png\" alt=\"\">";
    let usersUl = document.getElementById('listOfMembers');
    let usersli = document.createElement('div');
    usersli.classList.add('member_name');
    usersli.innerHTML = memberDispHTML;
    usersUl.appendChild(usersli);
}

function main() {
    var memberNum = 0;
    genButton();
    addMemberInputField(memberNum);
    addMemberButton(memberNum);
}

main();
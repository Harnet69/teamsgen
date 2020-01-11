window.onload = function() {
    dragula([document.getElementById('left'), document.getElementById('right')]);
};

// closure for members counter
let membersNum = (function() {
    let membsCounter = 0;
    function changeBy(val) {
        membsCounter += val;
    }
    return {
        inc: function() {
            changeBy(1);
        },
        decr: function() {
            changeBy(-1);
        },
        val: function() {
            return membsCounter;
        }
    };
})();

// slowly disappear element
function elemDisapp(elemForDIsapp){
    let opacity =1;
    let timeOut = setInterval(function () {
        elemForDIsapp.style.opacity = opacity;
        opacity -= 0.005;
        if(opacity <= 0){
            clearInterval(timeOut);
            elemForDIsapp.removeEventListener("click", elemDisapp);
            elemForDIsapp.remove();
        }
    },1);
}

// add event click to a generate button
function genButton() {
    const genButton = document.getElementById('generate');

    genButton.addEventListener('click', function () {
        elemDisapp(genButton); // gen button disappear
        elemDisapp(document.getElementById('left')); // Div with members disappear
        document.getElementById('right').style.width = '100%'; // wide div with results to 100% width
        createResult(addMembsToArr()); // get users names, shuffle and display
    });
}

// add member name by a input field
function addMemberInputField() {
    let addMemberInput = document.querySelector('#add_member_input');

    addMemberInput.addEventListener('keyup', function () {
         if (event.keyCode === 13) { // if 'Enter' was pressed on a input field
             addMemberRecord(addMemberInput.value);
             membersNum.inc();
             document.getElementById('numOfMemb').textContent = membersNum.val();
         }
    });
}

// add member with button add
function addMemberButton() {
    let addMemberButton = document.querySelector('#add_btn');

    addMemberButton.addEventListener('click', function () {
        let memberNameInputField = document.querySelector('#add_member_input');
        addMemberRecord(memberNameInputField.value);
        membersNum.inc(); // increase a members counter
        document.getElementById('numOfMemb').textContent = membersNum.val();
    });
}

// create a new user information div
function addMemberRecord(memberName) {
    let memberDispHTML = "<label class='member_name_for_arr' id='member"+membersNum.val()+"_name'>"+memberName+"</label><img class='del_button' id='del"+membersNum.val()+"Button' src=\"/static/img/del_btn.png\" alt=\"\">";
    let usersUl = document.getElementById('listOfMembers');
    let usersli = document.createElement('div');

    usersli.classList.add('member_name');
    usersli.setAttribute('id', 'member'+membersNum.val()+'_name'); // give id to div for future deletion
    usersli.innerHTML = memberDispHTML;
    usersUl.appendChild(usersli);
    delMember(membersNum.val());
    clearInputField();
}

// add members list to array
function addMembsToArr() {
    let membNames = document.getElementsByClassName('member_name_for_arr');
    let membersNames = [];

    for(let member_name of membNames){
        membersNames.push(member_name.textContent);
    }

    return shuffle(membersNames);
}

// shuffle members names array
function shuffle(arrForShuffle) {
    return arrForShuffle.sort(() => Math.random() - 0.5);
}

// divide members according to a number of a team
function divideMembsToTeams(membNamesArr, membsInTeam) {
    let teamsArr = [];
    let arrays = [];
    let size = membsInTeam;

    while (membNamesArr.length > 0)
        arrays.push(membNamesArr.splice(0, size));

    return arrays;
}

// display teams
function createResult(membNamesArr) {
    let membsInTeam = document.getElementById('memb_in_team').value;
    let rightDiv = document.getElementById('right');
    let teamsArr = divideMembsToTeams(membNamesArr, membsInTeam); // array of teams
    rightDiv.firstElementChild.innerHTML = "Teams:";
    // show teams
    for(let team in teamsArr){
        let membUl = document.createElement('ul');
        rightDiv.appendChild(membUl);
        for(let membName of teamsArr[team]){
            let membLi = document.createElement('li');
            membLi.textContent = membName;
            membUl.appendChild(membLi);
        }
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
        membersNum.decr();
        document.getElementById('numOfMemb').textContent = membersNum.val();
    });
}


function main() {
    genButton();
    addMemberInputField();
    addMemberButton();
}

main();
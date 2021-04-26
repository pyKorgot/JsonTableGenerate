/* First create Table */
function getHeaderForTable() {
    // return header fot table
    let header = `<th>№</th>
    <th onclick="sortTable(1)">ФИО</th>
    <th onclick="sortTable(2)">Дата рождения</th>
    <th colspan="2" onclick="sortTable(3)">Оклад</th>`

    return header;
}

function getBirthday(data) {
    // return birthday for tbody
    let birthday = new Date(data);

    return birthday.toDateString();
}

function getBodyForTable(database) {
    // function return information for table
    keys = ['id', 'name', 'age', 'salary']; // keys for json
    let tableBody = '';
    for (i = 0; i < database.length; i++) {
        // loop for create rows in table
        for (j = 0; j < 4; j++) {
            if (j == 0) {
                tableBody += `<td class="id">${i + 1}</td>`;
            } else if (j == 1) {
                tableBody += `<td contenteditable='true' class="name">${database[i][keys[j]]}</td>`;
            } else if (j == 2) {
                let birthday = getBirthday(database[i][keys[j]])
                tableBody += `<td contenteditable='true' class="birthday">${birthday}</td>`;
            } else if (j == 3) {
                tableBody += `<td contenteditable='true' class="salary">${database[i][keys[j]]}</td>`;
            } else {
                tableBody += `<td contenteditable='true'>${database[i][keys[j]]}</td>`;
            }
        }
        if (i == database.length - 1) {
            tableBody += '<td class="delete"><buton onclick="deleteRow(this)">X</buton></td>';
        } else {
            tableBody += '<td class="delete"><buton onclick="deleteRow(this)">X</buton></td><tr>';
        }
    }

    return tableBody;
}

function getSumSalary(database) {
    // function return sum salary for table
    sum = 0;
    for (i = 0; i < database.length; i++) {
        sum += +(database[i]['salary']);
    }

    return sum;
}

function createTable(tableRef, tableInfo, maxNum, sumSalary) {
    // create header table
    let headerTr = document.createElement('thead');
    headerTr.className = ('tabl-head');
    headerTr.innerHTML = getHeaderForTable();
    tableRef.appendChild(headerTr);

    // create body table
    let bodyTr = document.createElement('tbody');
    bodyTr.className = ('tabl-body');
    bodyTr.innerHTML = tableInfo;
    tableRef.appendChild(bodyTr);

    // create footer table
    let footTr = document.createElement('tfoot');
    footTr.className = ('tabl-footer');
    footTr.innerHTML = `<td>Итого</td>
                        <td><span id="quantity">${maxNum}</span></td>
                        <td><span id="quantity1">${maxNum}</span></td>
                        <td><span id="sumSalary">${sumSalary}</span></td>
                        <td id="update" onclick="updateTable()">U</td>`;
    tableRef.appendChild(footTr);
}

function createMain() {
    // main function for script
    let database = JSON.parse(data);
    let tableRef = document.getElementById('tableID');

    let maxNum = database.length;
    let tableInfo = getBodyForTable(database);
    let sumSalary = getSumSalary(database);

    createTable(tableRef, tableInfo, maxNum, sumSalary);

    return maxNum;
}



/* Change pasive items in table */
function changeQuanity(num) {
    // Change Quanity if create or delete row
    document.getElementById("quantity").innerHTML = maxNum + num;
    document.getElementById("quantity1").innerHTML = maxNum + num;
    maxNum += num;
}

function changeId() {
    // Change Id in first column if create or delete row
    let rows = document.getElementsByClassName("id");
    for (i = 0; i < rows.length; i++) {
        let id = rows[i].innerHTML = i + 1;
    }
}

function formatBirthday() {
    let birthdays = document.getElementsByClassName("birthday");
    for (i = 0; i < birthdays.length; i++) {
        if (birthdays[i].innerHTML == 'YYYY-MM-DD') {
            birthdays[i].classList.add('invalid');
        } else {
            let date = new Date(birthdays[i].innerHTML);
            if (date == 'Invalid Date') {
                birthdays[i].innerHTML = "YYYY-MM-DD";
                birthdays[i].classList.add('invalid');

            } else {
                birthdays[i].innerHTML = date.toDateString();
                birthdays[i].classList.remove('invalid');
            }
        }
    }
}


/* Add and Delete items in table */
function addRow() {
    // function to create new row
    var tbody = document.getElementsByTagName("tbody")[0];
    var row = document.createElement("tr");

    let editable = '<td contenteditable="true"';
    row.innerHTML = `<td class="id"></td>
    ${editable} class="name"></td>
    ${editable} class="birthday">YYYY-MM-DD</td>
    ${editable} class="salary">0</td>
    <td class="delete"><buton onclick="deleteRow(this)">X</buton></td><tr>`;
    tbody.appendChild(row);

    changeQuanity(1);
    changeId();
    updateTable();
}

function deleteRow(btn) {
    // function to delete row
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    changeQuanity(-1);
    changeId();
    updateTable();
}


/* Another */
function saveTable() {
    // function to save table
    alert("We don't have server with database, to save your changes");
}

function updateTable() {
    // Update items in table
    let sumSalary = document.getElementById("sumSalary");
    let salarys = document.getElementsByClassName("salary");
    let sum = 0;
    for (i = 0; i < salarys.length; i++) {
        sum += +salarys[i].innerHTML;
    }
    sumSalary.innerHTML = sum;

    changeId();
    formatBirthday();
    validate();
}

function validate() {
    let salarys = document.getElementsByClassName("salary");
    for (i = 0; i < salarys.length; i++) {;
        if (isNaN(+salarys[i].innerHTML)) {
            salarys[i].innerHTML = '0';
            updateTable();
        }
        if (salarys[i].innerHTML == 0) {
            salarys[i].classList.add('invalid');
        } else {
            salarys[i].classList.remove('invalid');
        }
    }
    let names = document.getElementsByClassName("name");
    for (i = 0; i < salarys.length; i++) {
        if (names[i].innerHTML == '') {
            names[i].classList.add('invalid');
        } else {
            names[i].classList.remove('invalid');
        }
    }
}


let maxNum = createMain(); // start create table
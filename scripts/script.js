function getHeaderForTable() {
    // get header
    let header = `<th onclick="sortTable(0)">№</th>
    <th onclick="sortTable(1)">ФИО</th>
    <th onclick="sortTable(2)">Дата рождентя</th>
    <th onclick="sortTable(3)" colspan="2">Оклад</th>`
        // <th></th>`
    return header;
}

function getJsonForTable(database) {
    // function get information for table
    keys = ['id', 'name', 'age', 'salary']; // keys for json
    let tableBody = '';
    for (i = 0; i < database.length; i++) {
        // loop for create rows in table
        for (j = 0; j < 4; j++) {
            tableBody += `<td contenteditable='true'>${database[i][keys[j]]}</td>`;
        }
        tableBody += '<td class="delete"><buton onclick="deleteRow(this)">X</buton></td><tr>';
    }
    return tableBody;
}


function GetSumSalary(database) {
    // function get sum salary for table
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
    footTr.innerHTML = `<td>Итого</td><td>${maxNum}</td><td>${maxNum}</td><td colspan="2">${sumSalary}</td>`;
    tableRef.appendChild(footTr);
}


function createMain() {
    // main function for script
    let database = JSON.parse(data);
    let tableRef = document.getElementById('tableID');

    let maxNum = database.length;
    let tableInfo = getJsonForTable(database);
    let sumSalary = GetSumSalary(database);

    createTable(tableRef, tableInfo, maxNum, sumSalary);
}


createMain(); // start create table


function deleteRow(btn) {
    // function to delete row
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}


function addRow() {
    // function to create new row
    var tbody = document.getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR");
    let editable = '<td contenteditable="true">';
    row.innerHTML = `${editable}</td>
        ${editable}</td>
        ${editable}</td>
        ${editable}0</td>
        <td class="delete"><buton onclick="deleteRow(this)">X</buton></td><tr>`;
    tbody.appendChild(row);
}


function saveTable() {
    // function to save table
    alert("We don't have server with database, to save your changes");
}
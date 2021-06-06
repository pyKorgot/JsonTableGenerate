// Header order
let headers = ['id', 'name', 'birthday', 'salary'];

function changeHeaders(head, firstVar, secondVar) {
    // Change array headers
    let tmp = headers[secondVar];
    headers[secondVar] = head;
    headers[firstVar] = tmp;
}

function changeColumn(col, firstVar, secondVar, iter, rows) {
    // Change position column
    let tmp, tmpClass, tmpDate, tmpContEdit, dateField1 = false,
        dateField2 = false;


    if (headers[firstVar] == 'birthday' && iter != 0 && iter != rows - 1) {
        dateField1 = true;
        tmpDate = col[firstVar].getElementsByTagName('input')[0].value;

    } else if (headers[secondVar] == 'birthday' && iter != 0 && iter != rows - 1) {
        dateField2 = true;
        tmpDate = col[secondVar].getElementsByTagName('input')[0].value;
    }

    col[firstVar].classList.remove('invalid');
    col[secondVar].classList.remove('invalid');

    tmpContEdit = col[firstVar].contentEditable;
    tmpClass = col[firstVar].className;
    tmp = col[firstVar].innerHTML;
    col[firstVar].classList.remove(tmpClass);

    col[firstVar].innerHTML = col[secondVar].innerHTML;
    col[firstVar].contentEditable = col[secondVar].contentEditable;
    if (dateField2) {
        col[firstVar].getElementsByTagName('input')[0].value = tmpDate;
    }
    col[firstVar].classList.add(col[secondVar].className);

    col[secondVar].classList.remove(col[secondVar].className);
    col[secondVar].innerHTML = tmp;
    col[secondVar].contentEditable = tmpContEdit;
    if (dateField1) {
        col[secondVar].getElementsByTagName('input')[0].value = tmpDate;
    }
    col[secondVar].classList.add(tmpClass);

}


function movingColumn(head, dir) {
    // Find rows and items to change position
    let firstVar = headers.indexOf(head)
    if (dir == 'left') {
        secondVar = firstVar - 1;
    } else if (dir == 'right') {
        secondVar = firstVar + 1;
    }
    if (secondVar == -1) {
        secondVar = 3;
    } else if (secondVar == 4) {
        secondVar = 0;
    }


    let table = document.getElementById('tableID'),
        trs = table.getElementsByTagName('tr'),
        rows = trs.length;

    for (let i = 0; i < rows; i++) {
        if (i == 0) {
            let col = trs[i].getElementsByTagName('th');
            changeColumn(col, firstVar, secondVar, i, rows);
        } else {
            let col = trs[i].getElementsByTagName('td');
            changeColumn(col, firstVar, secondVar, i, rows);
        }
    }
    changeHeaders(head, firstVar, secondVar)
}
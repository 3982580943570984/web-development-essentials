$(document).ready(function () {
    let url = document.URL;
    let info = url.substring(url.indexOf('?') + 1).split('=');
    let login = info[1];

    $('.helloUser').text(`Hello, ${login}`);

    function makeRequest() {
        let xhr = new XMLHttpRequest();
        let url = "../PHP/Request.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                if (json.success) {
                    $('#medName-error-msg').text('');
                    $('#medForm-error-msg').text('');
                    $('#medAmount-error-msg').text('');
                    $('#medDosage-error-msg').text('');
                    $('#medFirm-error-msg').text('');

                    $('#medName-error').css('background-color', 'green');
                    $('#medForm-error').css('background-color', 'green');
                    $('#medAmount-error').css('background-color', 'green');
                    $('#medDosage-error').css('background-color', 'green');
                    $('#medFirm-error').css('background-color', 'green');

                    $('.result3').text('Request successfully sent');
                } else {
                    $('.result3').text(json.identityError);

                    $('#medName-error-msg').text(json.nameError);
                    json.nameError ? $('#medName-error').css('background-color', 'red') : $('#medName-error').css('background-color', 'green');

                    $('#medForm-error-msg').text(json.formError);
                    json.formError ? $('#medForm-error').css('background-color', 'red') : $('#medForm-error').css('background-color', 'green');

                    $('#medAmount-error-msg').text(json.amountError);
                    json.amountError ? $('#medAmount-error').css('background-color', 'red') : $('#medAmount-error').css('background-color', 'green');

                    $('#medDosage-error-msg').text(json.dosageError);
                    json.dosageError ? $('#medDosage-error').css('background-color', 'red') : $('#medDosage-error').css('background-color', 'green');

                    $('#medFirm-error-msg').text(json.firmError);
                    json.firmError ? $('#medFirm-error').css('background-color', 'red') : $('#medFirm-error').css('background-color', 'green');
                }
            }
        };
        var data = JSON.stringify(
            {
                "login": login,
                "name": $('#medicine-name').val(),
                "form": $('#medicine-form').val(),
                "amount": $('#medicine-amount').val(),
                "dosage": $('#medicine-dosage').val(),
                "firm": $('#medicine-firm').val()
            }
        );
        xhr.send(data);
    };

    function displayRequests() {
        let xhr = new XMLHttpRequest();
        let url = "../PHP/UserRequests.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let requests = JSON.parse(xhr.responseText);
                let tableString = `
                    <tr>
                        <th width="5%">Request number</th>
                        <th width="25%">Medicine</th>
                        <th width="10%">Form</th>
                        <th width="10%">Amount</th>
                        <th width="10%">Dosage</th>
                        <th width="20%">Firm</th>
                        <th width="10%"></th>
                        <th width="10%"></th>
                    </tr>
                `;
                $('.requests-table').append(tableString);
                for (key in requests) {
                    let tableString = `
                        <tr id="${key}">
                            <td>${key}</td>
                            <td>${requests[key]['name']}</td>
                            <td>${requests[key]['form']}</td>
                            <td>${requests[key]['amount']}</td>
                            <td>${requests[key]['dosage']}</td>
                            <td>${requests[key]['firm']}</td>
                            <td>
                                <button type="button" id="btn-edit-${key}" value="${key}">Edit</button>
                            </td>
                            <td>
                                <button type="button" id="btn-delete-${key}">Delete</button>
                            </td>
                        </tr>
                    `;
                    $('.requests-table').append(tableString);
                    $(`#btn-delete-${key}`).on("click", function (event) {
                        deleteRequest(event);
                    });
                }
                for (key in requests) {
                    let editButton = document.getElementById(`btn-edit-${key}`);
                    editButton.addEventListener("click", function (event) {
                        for (i = 1; i < 6; i++) {
                            if(i == 2){
                                event.path[2].cells[i].innerHTML = `
                                    <select>
                                        <option value="Pills">Pills</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Powder">Powder</option>
                                    </select>
                                `;
                            }else{
                                event.path[2].cells[i].innerHTML = `
                                    <input type="text" value="${event.path[2].cells[i].innerText}">
                                `;
                            }
                        }
                        event.path[1].innerHTML = `
                            <button type="button" id="btn-confirm-edit-${this.value}" value="${this.value}">Confirm edit</button>
                        `;
                        let confirmEditButton = document.getElementById(`btn-confirm-edit-${this.value}`);
                        confirmEditButton.addEventListener("click", function (event) {
                            editRequest(event);
                        });
                    });
                }
            }
        };
        var data = JSON.stringify({
            "login": login,
            "type": 'display'
        });
        xhr.send(data);
    };

    function editRequest(event) {
        let xhr = new XMLHttpRequest();
        let url = "../PHP/UserRequests.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                $('.requests-table').empty();
                displayRequests();
                $('#errName').text(json.nameError);
                $('#errAmount').text(json.amountError);
                $('#errDosage').text(json.dosageError);
                $('#errFirm').text(json.firmError);
                $('#errIdentity').text(json.identityError);
            }
        };
        var data = JSON.stringify({
            "login": login,
            "id": event.path[2].id,
            "newName": event.path[2].cells[1].children[0].value,
            "newForm": event.path[2].cells[2].children[0].selectedOptions[0].value,
            "newAmount": event.path[2].cells[3].children[0].value,
            "newDosage": event.path[2].cells[4].children[0].value,
            "newFirm": event.path[2].cells[5].children[0].value,
            "type": 'edit'
        });
        xhr.send(data);
    };

    function deleteRequest(event) {
        let xhr = new XMLHttpRequest();
        let url = "../PHP/UserRequests.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) { event.target.parentElement.parentNode.remove(); }
        };
        var data = JSON.stringify({
            "login": login,
            "id": event.target.parentElement.parentNode.id,
            "type": 'delete'
        });
        xhr.send(data);
    }; 

    $('#btn-request').on('click', function () {
        makeRequest();
    });

    $('#btn-request-table').on('click', function () {
        displayRequests();
        $(".request-form").fadeOut(0);
        $(".requests-table-form").fadeIn(400);
    });

    $('#btn-getback').on('click', function () {
        $(".requests-table-form").fadeOut(0);
        $(".request-form").fadeIn(400);
        $('.requests-table').empty();
    });

    $('#btn-quit').on('click', function () {
        document.location = `http://localhost/Lab_6/index.html`;
    });

})
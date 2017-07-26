(function AppController() {
    var userService = io.connect('/print');
    var shippingService = io.connect('/shipping');

    userService.on('update', listUsers);
    shippingService.on('update', listShippings);

    listUsers();
    listShippings();
    listPrints();

    function json(response) {
        return response.json();
    }

    function listUsers() {
        fetch('/user').then(json).then(function(users) {
            let table = document.getElementsByClassName('js-users')[0];
            users.forEach((user) => {
                let row = table.insertRow();
                row.insertCell().innerHTML = user._id;
                row.insertCell().innerHTML = user.name;
                row.insertCell().innerHTML = user.role || 'default';
            });
        });
    }

    function listShippings() {
        fetch('/shipping').then(json).then(function(shippings) {
            let table = document.getElementsByClassName('js-shipping')[0];
            shippings.forEach((shipping) => {
                let row = table.insertRow();
                row.insertCell().innerHTML = shipping._id;
                row.insertCell().innerHTML = shipping.order;
                row.insertCell().innerHTML = shipping.quantity || 1;
                row.insertCell().innerHTML = `<button data-id="${shipping._id}" type="button" class="btn btn-sm btn-danger js-shipping-delete">Delete</button>`;
                document.getElementsByClassName('js-shipping-delete')[0].addEventListener('click', deleteShipping);
            });
        });
    }

    function deleteShipping() {
        fetch('/shipping', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: `{"id": "${this.dataset.id}"}`
        }).then(listShippings);
    };

    document.getElementsByClassName('js-add-shipping')[0].addEventListener('click', createShipping);
    function createShipping() {
        var order = document.getElementById('shipping.order').value;
        var quantity = document.getElementById('shipping.quantity').value;
        fetch('/shipping', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: `{
                    "order": "${order}",
                    "quantity": "${quantity}"
                }`
        }).then(listShippings);
    };

    function listPrints() {
        fetch('/print').then(json).then(function(prints) {
            let table = document.getElementsByClassName('js-print')[0];
            prints.forEach((print) => {
                let row = table.insertRow();
                row.insertCell().innerHTML = print._id;
                row.insertCell().innerHTML = print.order;
                row.insertCell().innerHTML = print.quantity || 1;
                row.insertCell().innerHTML = `<button data-id="${print._id}" type="button" class="btn btn-sm btn-danger js-print-delete">Delete</button>`;
                document.getElementsByClassName('js-print-delete')[0].addEventListener('click', deletePrint);
            });
        });
    }

    function deletePrint() {
        fetch('/print', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json'
            },
            body: `{"id": "${this.dataset.id}"}`
        }).then(listPrints);
    };

    // $scope.create = function() {
    //     $http.patch('/shipping', {
    //         order: $scope.shipping.order
    //     }).success(function(data) {
    //         $scope.shipping = data;
    //     });
    // };

})();

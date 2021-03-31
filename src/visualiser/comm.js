(function () {
    "use strict";

    function getListOfData() {
        return fetch("/ls", {method: "POST"}).then(response => response.json()).then(response => {
            if (response.status !== "OK") {
                throw new Error(response.message);
            }

            return response.response;
        });
    }


    function getData(file) {
        return fetch(`/data/${file}`).then(response => response.json());
    }


    window.comm = {getListOfData, getData};
}());



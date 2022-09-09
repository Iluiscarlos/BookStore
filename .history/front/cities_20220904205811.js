const { increment } = require("../api/models/Books");
const State = require("../api/models/States");

const ENDPOINT = "http://localhost:3000";
const loadTable = () => {

    axios.get(`${ENDPOINT}/cities`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.state_id + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCitiesEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="citiesDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const citiesCreate = () => {
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("state_id").value;

    axios.post(`${ENDPOINT}/cities`,{
        name: name,
        state_id: state_id
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create city: ${error.response.data.error} `)
                .then(() => {
                    showCitiesCreateBox();
                })
        });
}

const getCities = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const citiesEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("state_id").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        state_id: state_id,
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCitiesEditBox(id);
                })
        });
}

const citiesDelete = async (id) => {
    const city = await getCities(id);
    const data = city.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
        .then((response) => {
            Swal.fire(`city ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete city: ${error.response.data.error} `);
            loadTable();
        });
};

const showCitiesCreateBox = () => {
    Swal.fire({
        title: 'Create city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="state_id" class="swal2-input" placeholder="state_id">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            citiesCreate();
        }
    });
}

const showCitiesEditBox = async (id) => {
    const city = await getCities(id);
    const data = city.data;
    Swal.fire({
        title: 'Edit city',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<select id="state_id" class="swal2-input" placeholder="state_id" value="' + data.state.name + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            citiesEdit();
        }
    });

}

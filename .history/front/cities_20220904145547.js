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
                    trHTML += '<td>' + element.state_Id + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCitiesEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="CitiesDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const citiesCreate = () => {
    const name = document.getElementById("name").value;
    const state_Id = document.getElementById("state_Id").value;

    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        province: province
    })
        .then((response) => {
            Swal.fire(`state ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create state: ${error.response.data.error} `)
                .then(() => {
                    showStateCreateBox();
                })
        });
}

const getstate = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const stateEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const province = document.getElementById("province").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        province: province,
    })
        .then((response) => {
            Swal.fire(`state ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update state: ${error.response.data.error} `)
                .then(() => {
                    showCitiesEditBox(id);
                })
        });
}

const CitiesDelete = async (id) => {
    const state = await getstate(id);
    const data = state.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
        .then((response) => {
            Swal.fire(`state ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete state: ${error.response.data.error} `);
            loadTable();
        });
};

const showStateCreateBox = () => {
    Swal.fire({
        title: 'Create state',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="province" class="swal2-input" placeholder="Province">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            citiesCreate();
        }
    });
}

const showCitiesEditBox = async (id) => {
    const state = await getstate(id);
    const data = state.data;
    Swal.fire({
        title: 'Edit state',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="province" class="swal2-input" placeholder="province" value="' + data.province + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            stateEdit();
        }
    });

}

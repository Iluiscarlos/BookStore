
const ENDPOINT = "http://localhost:3000";

const getStates = () => {
    return axios.get(`${ENDPOINT}/states`);
}

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
                    trHTML += '<td>' + element.State.name + '</td>';
                    trHTML += '<td>' + element.cep + '</td>';
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
    const cep = document.getElementById("cep").value;
    const state_id = document.getElementById("myselect").value;

    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        cep: cep,
        StateId: state_id
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
    const cep = document.getElementById("cep").value;
    const state_id = document.getElementById("myselect").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        cep: cep,
        StateId: state_id
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

const createStatesCombo = async (id) => {
    const states = await getStates();
    const data = states.data;
    let select = '<select class="swal2-input" id="myselect">';

    select += `<option value = "0" selected disabled>Select a State</option>`
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (id === element.id) {
            select += `<option value="${element.id}" selected>${element.name}</option>`
        } else {
            select += `<option value ="${element.id}">${element.name}</option>`
        }
    }
    select += '</select>';
    return select;
}

const showCitiesCreateBox = async () => {
    const states = await createStatesCombo();
    
    Swal.fire({
        title: 'Create city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="cep" class="swal2-input" placeholder="CEP">' +
            states,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            
            const ENDPOINT1 = 'https://viacep.com.br/ws'
            const cep = document.getElementById("cep").value;
            axios.get(`${ENDPOINT1}/${cep}/json`)
                .then(async (response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        await citiesCreate();
                    }},(error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            Text: 'Invalid CEP'
                        })
                    });
                    loadTable();
                }
        }
}

const showCitiesEditBox = async (id) => {
            const states = await createStatesCombo();
            const city = await getCities(id);
            const data = city.data;
            Swal.fire({
                title: 'Edit city',
                html:
                    '<input id="id" type="hidden" value=' + data.id + '>' +
                    '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
                    '<input id="cep" class="swal2-input" placeholder="CEP" value="' + data.cep + '">' +
                    states,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    citiesEdit();
                }
            });
        }

const ENDPOINT1 = 'https://viacep.com.br/ws'
const getCep = () => {
            const cep = document.getElementById("cep").value;
            axios.get(`${ENDPOINT1}/${cep}/json`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                    } else {
                        console.error(error.response.data)
                    }

                });
        }

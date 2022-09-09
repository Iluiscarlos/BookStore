const ENDPOINT = "http://localhost:3000";

const getCities = () =>{
    return axios.get(`${ENDPOINT}/cities`);
}

const loadTable = () => {

    axios.get(`${ENDPOINT}/publishers`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showpublishersEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publishersDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const publishersCreate = () => {
    const name = document.getElementById("name").value;
    const cities_id = document.getElementById("cities_id").value;

    axios.post(`${ENDPOINT}/publishers`, {
        name: name,
        CityId: cities_id
    })
        .then((response) => {
            Swal.fire(`Publishing House ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create publishers: ${error.response.data.error} `)
                .then(() => {
                    showPublishersCreateBox();
                })
        });
}

const getPublishers = (id) => {
    return axios.get(`${ENDPOINT}/publishers/` + id);
}

const publishersEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const cities_id = document.getElementById("cities_id").value;

    axios.put(`${ENDPOINT}/publishers/` + id, {
        name: name,
        CityId: cities_id,
    })
        .then((response) => {
            Swal.fire(`Publishing House ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update publishing house: ${error.response.data.error} `)
                .then(() => {
                    showpublishersEditBox(id);
                })
        });
}

const publishersDelete = async (id) => {
    const publishers = await getPublishers(id);
    const data = publishers.data;
    axios.delete(`${ENDPOINT}/publishers/` + id)
        .then((response) => {
            Swal.fire(`Publishers ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete publishers: ${error.response.data.error} `);
            loadTable();
        });
};

const createCityCombo = async (id) =>{
    const city = await getCities();
    const data = city.data;
    let select = '<select class="swal2-input" id="cities_id">';
    
    for(let i = 0; i < data.length; i++){
        const element =  data[i];
        if( id === element.id){
            select += `<option value="${element.id}" selected>${element.name}</option>`
        }else{
            select += `<option value ="${element.id}">${element.name}</option>`
        }
    }
    select += '</select>';
    return select;
}

const showPublishersCreateBox = async () => {
    const cities = await createCityCombo();
    Swal.fire({
        title: 'Create publishers',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">' +
            cities,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publishersCreate();
        }
    });
}

const showPublishersEditBox = async (id) => {
    const publishers = await getPublishers(id);
    const data = publishers.data;
    const cities = await createCityCombo();
    Swal.fire({
        title: 'Edit publishers',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            cities,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publishersEdit();
        }
    });

}

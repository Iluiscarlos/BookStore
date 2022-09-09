const ENDPOINT = "http://localhost:3000";
const loadTable = () => {

    axios.get(`${ENDPOINT}/books`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.title + '</td>';
                    trHTML += '<td>' + element.author + '</td>';
                    trHTML += '<td>' + element.publication_year + '</td>';
                    trHTML += '<td>' + element.pages + '</td>';
                    trHTML += '<td>' + element.categories_id + '</td>';
                    trHTML += '<td>' + element.publishers_id + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCitiesEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="citiesDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const booksCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const categories_id = document.getElementById("auth").value;
    const state_id = document.getElementById("author").value;

    axios.post(`${ENDPOINT}/cities`, {
        title: title,
        state_id: state_id
    })
        .then((response) => {
            Swal.fire(`City ${response.data.title} created`);
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
    const title = document.getElementById("title").value;
    const state_id = document.getElementById("state_id").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        title: title,
        state_id: state_id,
    })
        .then((response) => {
            Swal.fire(`City ${response.data.title} updated`);
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
            Swal.fire(`city ${data.title} deleted`);
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
            '<input id="title" class="swal2-input" placeholder="Name">' +
            '<input id="state_id" class="swal2-input" placeholder="state_id">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            booksCreate();
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
            '<input id="title" class="swal2-input" placeholder="Name" value="' + data.title + '">' +
            '<input id="state_id" class="swal2-input" placeholder="state_id" value="' + data.state_id + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            citiesEdit();
        }
    });

}

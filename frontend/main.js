const API = 'http://localhost:3000'

const createButton = (label, type) => {
    return $('<button>').addClass(`btn btn-${type}`).html(label)
}

const renderRows = clients => {
    const rows = clients.map(client => {
        const updateButton = createButton('Atualizar', 'warning')
        updateButton.click(() => loadClient(client))

        const removeButton = createButton('Excluir', 'danger')
        removeButton.click(() => removeClient(client))

        return $('<tr>')
            .append($('<td>').append(client.name))
            .append($('<td>').append(client.age))
            .append($('<td>').append(updateButton).append(removeButton))
    })

    $('#clientsRows').html(rows)
}

const loadClient = client => {
    $('[name=id]').val(client._id)
    $('[name=name]').val(client.name)
    $('[name=age]').val(client.age)
}

const removeClient = client => {
    $.ajax({
        method: 'DELETE',
        url: `${API}/clients/${client._id}`,
        success: getClients
    })
}
const getClients = () => {
    $.ajax({
        url: `${API}/clients`,
        success: clients => {
            renderRows(clients)
            $('[name]').val('')
            $('[age]').val('')
        }
    })
}

const saveClient = () => {
    const _id = $('[name=id]').val()
    const name = $('[name=name]').val()
    const age = $('[name=age]').val()
    $.ajax({
        method: _id ? 'PUT' : 'POST',
        url: `${API}/clients/${_id}`,
        data: _id ? { _id, name, age } : { name, age },
        success: getClients
    })
}

$(() => {
    getClients()
    $('[save]').click(saveClient)
})
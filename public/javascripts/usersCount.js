window.onload = async function (){

    showUsersCount();
}

async function showUsersCount(){

    try {
        
        let values = await $.ajax({
            url: `https://explainmeapp.herokuapp.com/api/users/`,
            method: 'GET',
            datatype: 'json',
        });

        console.log(values)

        let html = `<h1>${values.rowCount}</h1>`
        document.getElementById('CardValue').innerHTML = html;
        document.getElementById('CardValue2').innerHTML = html;

    } catch (error) {
        
    }
}
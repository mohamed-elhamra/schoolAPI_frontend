const documentReady=()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);


    axios.get('http://localhost:8080/schoolAPI/groups/'+id)
          .then(function (response) {
            console.log(response);
            document.getElementById('name').value=response.data.name;
    })
    .catch(function (error) {
                console.log(error);
    });

    document.getElementById('editForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.put('http://localhost:8080/schoolAPI/groups/'+id,{
            name:document.getElementById('name').value
        })
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableGroups.html");  
        })
        .catch(function (error) {
                console.log(error);
        });
    });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
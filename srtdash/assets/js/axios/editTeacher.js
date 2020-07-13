const documentReady=()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);


    axios.get('http://localhost:8080/schoolAPI/teachers/'+id)
          .then(function (response) {
            console.log(response);
            document.getElementById('firstname').value=response.data.first_name;
            document.getElementById('lastname').value=response.data.last_name;
    })
    .catch(function (error) {
                console.log(error);
    });

    document.getElementById('editForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.put('http://localhost:8080/schoolAPI/teachers/'+id,{
            first_name:document.getElementById('firstname').value,
            last_name:document.getElementById('lastname').value
        })
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableTeachers.html");  
        })
        .catch(function (error) {
                console.log(error);
        });
    });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
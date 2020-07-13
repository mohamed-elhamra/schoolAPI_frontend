const documentReady=()=>{
    const addTeacher=document.getElementById('addForm');
    addTeacher.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/schoolAPI/groups', {
            name: document.getElementById('name').value
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
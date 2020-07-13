
const documentReady=()=>{
    const addGroup=document.getElementById('addForm');
    const listGroups=document.getElementById('list-groups');
    axios.get('http://localhost:8080/schoolAPI/groups')
          .then(function (response) {
            console.log(response);
            response.data.forEach((group)=>{
                listGroups.innerHTML+=`<option value=`+group.id+`>${group.id}- ${group.name}</option>`
            })
          })
          .catch(function (error) {
            console.log(error);
          });

    addGroup.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/schoolAPI/students', {
            first_name: document.getElementById('firstname').value,
            last_name: document.getElementById('lastname').value,
            groups: listGroups.options[listGroups.selectedIndex].value
          })
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableStudents.html");
          })
          .catch(function (error) {
            console.log(error);
          });
    });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
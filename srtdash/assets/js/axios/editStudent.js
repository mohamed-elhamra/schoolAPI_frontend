
const documentReady=()=>{
    const editStudent=document.getElementById('editForm');
    const listGroups=document.getElementById('list-groups');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    let mygroup;
    axios.get('http://localhost:8080/schoolAPI/students/'+id)
          .then(function (response) {
                console.log(response);
                document.getElementById('firstname').value=response.data.first_name;
                document.getElementById('lastname').value=response.data.last_name;
                mygroup=response.data.groups;
          })
          .catch(function (error) {
            console.log(error);
          });
    axios.get('http://localhost:8080/schoolAPI/groups/')
          .then(function (response) {
            console.log(response);
            response.data.forEach((group)=>{
                if(group.id==mygroup){
                    listGroups.innerHTML+=`<option selected="selected" value=`+group.id+`>${group.id}- ${group.name}</option>`
                }else{
                    listGroups.innerHTML+=`<option value=`+group.id+`>${group.id}- ${group.name}</option>`
                }
            })
    })
    .catch(function (error) {
            console.log(error);
    });

    editStudent.addEventListener('submit',(e)=>{
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
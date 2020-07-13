const documentReady=()=>{
    const addTeacher=document.getElementById('addForm');
    addTeacher.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/schoolAPI/teachers', {
            first_name: document.getElementById('firstname').value,
            last_name: document.getElementById('lastname').value
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
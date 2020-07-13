const documentReady=()=>{
    const add=document.getElementById('addForm');
    const listGroups=document.getElementById('list-groups');
    const listSubjects=document.getElementById('list-subjects');
    const listTeachers=document.getElementById('list-teachers');
    
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
        
          axios.get('http://localhost:8080/schoolAPI/subjects')
          .then(function (response) {
            console.log(response);
            response.data.forEach((subjects)=>{
                listSubjects.innerHTML+=`<option value=`+subjects.id+`>${subjects.id}- ${subjects.title}</option>`
            })
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8080/schoolAPI/teachers')
          .then(function (response) {
            console.log(response);
            response.data.forEach((teachers)=>{
                listTeachers.innerHTML+=`<option value=`+teachers.id+`>${teachers.id}- ${teachers.first_name} ${teachers.last_name}</option>`
            })
          })
          .catch(function (error) {
            console.log(error);
          });


        add.addEventListener('submit',(e)=>{
            e.preventDefault();
            axios.post('http://localhost:8080/schoolAPI/subject_teacher', {
                teachers: listTeachers.options[listTeachers.selectedIndex].value,
                subjects: listSubjects.options[listSubjects.selectedIndex].value,
                groups: listGroups.options[listGroups.selectedIndex].value
            })
            .then(function (response) {
                console.log(response);
                window.location.replace("http://localhost:5500/srtdash/tableSubjectTeacher.html");
            })
            .catch(function (error) {
                console.log(error);
            });
        });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
const documentReady=()=>{
    const edit=document.getElementById('editForm');
    const listSubjects=document.getElementById('list-subjects');
    const listTeachers=document.getElementById('list-teachers');
    const listGroups=document.getElementById('list-groups');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let mygroup,myteacher,mysubject;
    axios.get(`http://localhost:8080/schoolAPI/subject_teacher/`+id)
          .then(function (response) {
                console.log(response);
                mygroup=response.data.groups;
                myteacher=response.data.teachers;
                mysubject=response.data.subjects;
          })
          .catch(function (error) {
            console.log(error);
          });
    axios.get('http://localhost:8080/schoolAPI/subjects/')
          .then(function (response) {
            console.log(response);
            response.data.forEach((subject)=>{
                if(subject.id==mysubject){
                    listSubjects.innerHTML+=`<option selected="selected" value=`+subject.id+`>${subject.id}- ${subject.title}</option>`
                }else{
                    listSubjects.innerHTML+=`<option value=`+subject.id+`>${subject.id}- ${subject.title}</option>`
                }
            });
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
            });
    })
    .catch(function (error) {
            console.log(error);
    });

    axios.get('http://localhost:8080/schoolAPI/teachers/')
          .then(function (response) {
            console.log(response);
            response.data.forEach((teacher)=>{
                if(teacher.id==myteacher){
                    listTeachers.innerHTML+=`<option selected="selected" value=`+teacher.id+`>${teacher.id}- ${teacher.last_name}</option>`
                }else{
                    listTeachers.innerHTML+=`<option value=`+teacher.id+`>${teacher.id}- ${teacher.first_name} ${teacher.last_name}</option>`
                }
            });
    })
    .catch(function (error) {
            console.log(error);
    });


    edit.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.patch('http://localhost:8080/schoolAPI/subject_teacher/'+id, {
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
const documentReady=()=>{
    const editMark=document.getElementById('editForm');
    const listStudent=document.getElementById('list-students');
    const listSubject=document.getElementById('list-subjects');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    let mystudent;
    let mysubject;
    axios.get('http://localhost:8080/schoolAPI/marks/'+id)
          .then(function (response) {
            console.log(response);
            
            document.getElementById('mark').value=response.data.mark;
            mystudent=response.data.students;
            mysubject=response.data.subjects;
            
          })
          .catch(function (error) {
            console.log(error);
          });
    axios.get('http://localhost:8080/schoolAPI/students/')
          .then(function (response) {
            console.log(response);
            response.data.forEach((student)=>{
                if(student.id==mystudent){
                    listStudent.innerHTML+=`<option selected="selected" value=`+student.id+`>${student.id}- ${student.first_name} ${student.last_name}</option>`
                }else{
                    listStudent.innerHTML+=`<option value=`+student.id+`>${student.id}- ${student.first_name} ${student.last_name}</option>`
                }
            })
    })
    .catch(function (error) {
            console.log(error);
    });

    axios.get('http://localhost:8080/schoolAPI/subjects/')
          .then(function (response) {
            console.log(response);
            response.data.forEach((subject)=>{
                if(subject.id==mysubject){
                    listSubject.innerHTML+=`<option selected="selected" value=`+subject.id+`>${subject.id}- ${subject.title} </option>`
                }else{
                    listSubject.innerHTML+=`<option value=`+subject.id+`>${subject.id}- ${subject.title} </option>`
                }
            })
    })
    .catch(function (error) {
            console.log(error);
    });

    editMark.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.patch('http://localhost:8080/schoolAPI/marks/'+id, {
            students: listStudent.options[listStudent.selectedIndex].value,
            subjects: listSubject.options[listSubject.selectedIndex].value,
            mark: document.getElementById('mark').value
          })
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableMarks.html");
          })
          .catch(function (error) {
            console.log(error);
          });
    });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
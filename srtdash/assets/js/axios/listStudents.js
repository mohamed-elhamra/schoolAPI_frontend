const documentReady=()=>{
    let listStudents=document.getElementById('listStudents');
    axios.get('http://localhost:8080/schoolAPI/students/')
          .then(function (response) {
            console.log(response);
            response.data.forEach(student => {
                listStudents.innerHTML+=`<tr>
                        <th scope="row">${student.id}</th>
                        <td>${student.first_name}</td>
                        <td>${student.last_name}</td>
                        <td>${student.groups}</td>
                        <td>
                            <i class="ti-trash" id=`+student.id+`></i>
                            <i class="ti-marker-alt" id=update-`+student.id+`></i>
                        </td>
                        </tr>`
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    let deletestudent=document.getElementById('deletestudent');
    deletestudent.style.visibility ='hidden';
    let cancelDeletestudent=document.getElementById('cancelDeletestudent');
    cancelDeletestudent.style.visibility ='hidden';
    listStudents.addEventListener('click',(e)=>{
      if(e.srcElement.classList.value=="ti-trash"){
        deletestudent.style.visibility ='visible';
        cancelDeletestudent.style.visibility ='visible';
        deletestudent.addEventListener('click',()=>{
          axios.delete('http://localhost:8080/schoolAPI/students/'+e.srcElement.id)
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableStudents.html");      
          })
          .catch(function (error) {
            console.log(error);
          });
        });
        cancelDeletestudent.addEventListener('click',()=>{
            deletestudent.style.visibility ='hidden';
            cancelDeletestudent.style.visibility ='hidden';
        });
      }else if(e.srcElement.classList.value=='ti-marker-alt'){
        window.location.replace("http://localhost:5500/srtdash/editStudent.html?id="+e.srcElement.id.slice(7));
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', documentReady, false);
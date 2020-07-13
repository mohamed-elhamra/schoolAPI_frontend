const documentReady=()=>{
  let listTeachers=document.getElementById('listTeachers');
  axios.get('http://localhost:8080/schoolAPI/teachers/')
        .then(function (response) {
          console.log(response);
          response.data.forEach(teacher => {
              listTeachers.innerHTML+=`<tr>
                      <th scope="row">${teacher.id}</th>
                      <td>${teacher.first_name}</td>
                      <td>${teacher.last_name}</td>
                      <td>
                          <i class="ti-trash" id=`+teacher.id+`></i>
                          <i class="ti-marker-alt" id=update-`+teacher.id+`></i>
                      </td>
                      </tr>`
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  let deleteTeacher=document.getElementById('deleteTeacher');
  deleteTeacher.style.visibility ='hidden';
  let cancelDeleteTeacher=document.getElementById('cancelDeleteTeacher');
  cancelDeleteTeacher.style.visibility ='hidden';
  listTeachers.addEventListener('click',(e)=>{
    if(e.srcElement.classList.value=="ti-trash"){
      deleteTeacher.style.visibility ='visible';
      cancelDeleteTeacher.style.visibility ='visible';
      deleteTeacher.addEventListener('click',()=>{
        axios.delete('http://localhost:8080/schoolAPI/teachers/'+e.srcElement.id)
        .then(function (response) {
          console.log(response);
          window.location.replace("http://localhost:5500/srtdash/tableTeachers.html");      
        })
        .catch(function (error) {
          console.log(error);
        });
      });
      cancelDeleteTeacher.addEventListener('click',()=>{
          deleteTeacher.style.visibility ='hidden';
          cancelDeleteTeacher.style.visibility ='hidden';
      });
    }else if(e.srcElement.classList.value=='ti-marker-alt'){
      window.location.replace("http://localhost:5500/srtdash/editTeacher.html?id="+e.srcElement.id.slice(7));
    }
  });
}

document.addEventListener('DOMContentLoaded', documentReady, false);
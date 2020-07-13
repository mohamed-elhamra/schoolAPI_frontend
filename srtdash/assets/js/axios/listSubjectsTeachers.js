const documentReady=()=>{
    let list=document.getElementById('list');

          axios.get('http://localhost:8080/schoolAPI/subject_teacher')
          .then(function (response) {
            console.log(response);
            response.data.forEach(subjects_teacher => {
                list.innerHTML+=`<tr>
                        <th scope="row">${subjects_teacher.subjects}</th>
                        <td>${subjects_teacher.teachers}</td>
                        <td>${subjects_teacher.groups}</td>
                        <td>
                            <i class="ti-trash" id=delete-${subjects_teacher.id}></i>
                            <i class="ti-marker-alt" id=update-${subjects_teacher.id}></i>
                        </td>
                        </tr>`
            });
          })
          .catch(function (error) {
            console.log(error);
          });

    let deletee= document.getElementById('delete');
    deletee.style.visibility ='hidden';
    let cancelDelete=document.getElementById('cancelDelete');
    cancelDelete.style.visibility ='hidden';
    list.addEventListener('click',(e)=>{
      if(e.srcElement.classList.value=="ti-trash"){
        deletee.style.visibility ='visible';
        cancelDelete.style.visibility ='visible';
        deletee.addEventListener('click',()=>{
            let data=e.srcElement.id.slice(7);
          axios.delete('http://localhost:8080/schoolAPI/subject_teacher/'+data)
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableSubjectTeacher.html");       
          })
          .catch(function (error) {
            console.log(error);
          });
        });
        cancelDelete.addEventListener('click',()=>{
            deletee.style.visibility ='hidden';
            cancelDelete.style.visibility ='hidden';
        });
      }else if(e.srcElement.classList.value=='ti-marker-alt'){
        let data=e.srcElement.id.slice(7);
        window.location.replace("http://localhost:5500/srtdash/editSubjectTeacher.html?id="+data);       
      }
    });    
}

document.addEventListener('DOMContentLoaded', documentReady, false);
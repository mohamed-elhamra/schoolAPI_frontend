const documentReady=()=>{
    let listSubjects=document.getElementById('listSubjects');
    axios.get('http://localhost:8080/schoolAPI/subjects/')
          .then(function (response) {
            console.log(response);
            response.data.forEach(subject => {
                listSubjects.innerHTML+=`<tr>
                        <th scope="row">${subject.id}</th>
                        <td>${subject.title}</td>
                        <td>
                            <i class="ti-trash" id=`+subject.id+`></i>
                            <i class="ti-marker-alt" id=update-`+subject.id+`></i>
                        </td>
                        </tr>`
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    let deletesubject=document.getElementById('deletesubject');
    deletesubject.style.visibility ='hidden';
    let cancelDeletesubject=document.getElementById('cancelDeletesubject');
    cancelDeletesubject.style.visibility ='hidden';
    listSubjects.addEventListener('click',(e)=>{
      if(e.srcElement.classList.value=="ti-trash"){
        deletesubject.style.visibility ='visible';
        cancelDeletesubject.style.visibility ='visible';
        deletesubject.addEventListener('click',()=>{
          axios.delete('http://localhost:8080/schoolAPI/subjects/'+e.srcElement.id)
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableSubjects.html");      
          })
          .catch(function (error) {
            console.log(error);
          });
        });
        cancelDeletesubject.addEventListener('click',()=>{
            deletesubject.style.visibility ='hidden';
            cancelDeletesubject.style.visibility ='hidden';
        });
      }else if(e.srcElement.classList.value=='ti-marker-alt'){
        window.location.replace("http://localhost:5500/srtdash/editSubject.html?id="+e.srcElement.id.slice(7));
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', documentReady, false);
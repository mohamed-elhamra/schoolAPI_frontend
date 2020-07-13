const documentReady=()=>{
    let listMarks=document.getElementById('listMarks');
    axios.get('http://localhost:8080/schoolAPI/marks')
          .then(function (response) {
            console.log(response);
            response.data.forEach(mark => {
                listMarks.innerHTML+=`<tr>
                        <th scope="row">${mark.id}</th>
                        <td>${mark.students}</td>
                        <td>${mark.subjects}</td>
                        <td>${mark.date}</td>
                        <td>${mark.mark}</td>
                        <td>
                            <i class="ti-trash" id=`+mark.id+`></i>
                            <i class="ti-marker-alt" id=update-`+mark.id+`></i>
                        </td>
                        </tr>`
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    let deleteMark=document.getElementById('deleteMark');
    deleteMark.style.visibility ='hidden';
    let cancelDeleteMark=document.getElementById('cancelDeleteMark');
    cancelDeleteMark.style.visibility ='hidden';
    listMarks.addEventListener('click',(e)=>{
      if(e.srcElement.classList.value=="ti-trash"){
        deleteMark.style.visibility ='visible';
        cancelDeleteMark.style.visibility ='visible';
        deleteMark.addEventListener('click',()=>{
          axios.delete('http://localhost:8080/schoolAPI/marks/'+e.srcElement.id)
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableMarks.html");       
          })
          .catch(function (error) {
            console.log(error);
          });
        });
        cancelDeleteMark.addEventListener('click',()=>{
            deleteMark.style.visibility ='hidden';
            cancelDeleteMark.style.visibility ='hidden';
        });
      }else if(e.srcElement.classList.value=='ti-marker-alt'){
        window.location.replace("http://localhost:5500/srtdash/editMark.html?id="+e.srcElement.id.slice(7));       
      }
    });    
}

document.addEventListener('DOMContentLoaded', documentReady, false);
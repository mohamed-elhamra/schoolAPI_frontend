const documentReady=()=>{
    let listgroups=document.getElementById('listGroups');
    axios.get('http://localhost:8080/schoolAPI/groups/')
          .then(function (response) {
            console.log(response);
            response.data.forEach(group => {
                listgroups.innerHTML+=`<tr>
                        <th scope="row">${group.id}</th>
                        <td>${group.name}</td>
                        <td>
                            <i class="ti-trash" id=`+group.id+`></i>
                            <i class="ti-marker-alt" id=update-`+group.id+`></i>
                        </td>
                        </tr>`
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    let deletegroup=document.getElementById('deletegroup');
    deletegroup.style.visibility ='hidden';
    let cancelDeletegroup=document.getElementById('cancelDeletegroup');
    cancelDeletegroup.style.visibility ='hidden';
    listgroups.addEventListener('click',(e)=>{
      if(e.srcElement.classList.value=="ti-trash"){
        deletegroup.style.visibility ='visible';
        cancelDeletegroup.style.visibility ='visible';
        deletegroup.addEventListener('click',()=>{
          axios.delete('http://localhost:8080/schoolAPI/groups/'+e.srcElement.id)
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tablegroups.html");      
          })
          .catch(function (error) {
            console.log(error);
          });
        });
        cancelDeletegroup.addEventListener('click',()=>{
            deletegroup.style.visibility ='hidden';
            cancelDeletegroup.style.visibility ='hidden';
        });
      }else if(e.srcElement.classList.value=='ti-marker-alt'){
        window.location.replace("http://localhost:5500/srtdash/editgroup.html?id="+e.srcElement.id.slice(7));
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', documentReady, false);
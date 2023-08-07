//ADMIN ROLES 
//Create Project
function createProject() {
    document.getElementById("createProject").style.display = "block";
    document.getElementById("assignedProjects").style.display = "none";
    document.getElementById("unassignedProjects").style.display = "none";
    document.getElementById("completedProjects").style.display = "none";
    document.getElementById("users").style.display = "none";
}
////
const createproject=document.querySelector('.createproject')
const projectTitle=document.querySelector('.Title')
const projectDescription=document.querySelector('.Description')
const endDate=document.querySelector('.Date')

createproject.addEventListener('submit', (e)=>{
     e.preventDefault()

    let createdProject=projectTitle.value !=="" && projectDescription.value !=="" && endDate.value !==""
    if(createdProject){
        axios 
        .post(
            "http://localhost:5000/project",
    
            {
              projectName: projectTitle.value,
              projectDescription: projectDescription.value,
              endDate:endDate.value,
            },
    
            {
              headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                
              },
            }
          ).then((res)=>{
            console.log(res.data)
            
          })
    }

})

/////
function assignedProjects() {
    document.getElementById("createProject").style.display = "none";
    document.getElementById("assignedProjects").style.display = "block";
    document.getElementById("unassignedProjects").style.display = "none";
    document.getElementById("completedProjects").style.display = "none";
    document.getElementById("users").style.display = "none";

    

    axios 
    .get(
        "http://localhost:5000/user/view/1",


        {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((res)=>{
        const dara=res.data
         const viewprojects=document.querySelector('.assignedProjects')
        console.log(dara)
        
    

        const singleProject= document.createElement('div')
        let html = ''    
    dara.projects.forEach(project => {
        project.forEach((item)=>{
            html+=`
         <div class="actualContent">
                           <div class="actualContentBody">
                               <div class="actualContentBody1">
                                   <p>Project:</p>
                               </div>
                               <div class="actualContentBody2">
                                   <p style="font-weight: bold;">${item.projectName} </p> </div>
                               <div class="actualContentBody3">
                                   <p class="update">UPDATE</p>
                               </div>
                           </div>
                           <div class="actualContentBody">
                               <div class="actualContentBody1">
                                   <p>Description:</p>
                               </div>
                               <div class="actualContentBody2">
                                   <p>${item.projectDescription}</p>
                               </div>
                               <div class="actualContentBody3">
                                   <p class="delete">DELETE</p>
                               </div>
                           </div>
                           <div class="actualContentBody">
                               <div class="actualContentBody1">
                                   <p>Assigned to:</p>
                               </div>
                               <div class="actualContentBody2">
                                   <p>
                                       Ngatia Mwai
                                   </p>
                               </div>
                           </div>
                           <div class="actualContentBody">
                               <div class="actualContentBody1">
                                   <p>Due Date:</p>
                               </div>
                               <div class="actualContentBody2">
                                   <p>${item.endDate}</p>
                               </div>
                           </div>
                       </div>
         `
        })
         
    })
        
        
         
         singleProject.innerHTML=html
         console.log(singleProject)
         viewprojects.appendChild(singleProject)
      })

     
}

////
function unassignedProjects() {
    document.getElementById("createProject").style.display = "none";
    document.getElementById("assignedProjects").style.display = "none";
    document.getElementById("unassignedProjects").style.display = "block";
    document.getElementById("completedProjects").style.display = "none";
    document.getElementById("users").style.display = "none";

    axios 
    .get(
        "http://localhost:5000/user/view/0",


        {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((res)=>{
        const dara=res.data
         const unAssigned=document.querySelector('.unassignedProjects')
        console.log(dara)
        
    

        const singleProject= document.createElement('div')
        let html = ''    
    dara.projects.forEach(project => {
        project.forEach((item)=>{
            html+=`
            <div class="actualContent">
            <div class="actualContentBody">
                <div class="actualContentBody1">
                    <p>Project:</p>
                </div>
                <div class="actualContentBody2">
                    <p style="font-weight: bold;">
                        ${item.projectName}
                    </p>
                </div>
                <div class="actualContentBody3">
                    <select class="assign" id="">
                        <option value="name">ASSIGN</option>
                    </select>
                </div>
            </div>
            <div class="actualContentBody">
                <div class="actualContentBody1">
                    <p>Description:</p>
                </div>
                <div class="actualContentBody2">
                    <p>
                        ${item.projectDescription}
                    </p>
                </div>
                <div class="actualContentBody3">
                    <p class="update">UPDATE</p>
                </div>
            </div>
            <div class="actualContentBody">
                <div class="actualContentBody1">
                    <p>Assigned to:</p>
                </div>
                <div class="actualContentBody2">
                    <p>
                        Ngatia Mwai
                    </p>
                </div>
            </div>
            <div class="actualContentBody">
                <div class="actualContentBody1">
                    <p>Due Date:</p>
                </div>
                <div class="actualContentBody2">
                    <p>
                ${item.endDate}
                    </p>
                </div>
            </div>
        </div>
         `
        })
         
    })
        
        
         
         singleProject.innerHTML=html
         console.log(singleProject)
         unAssigned.appendChild(singleProject)
      })

}
function completedProjects() {
    document.getElementById("createProject").style.display = "none";
    document.getElementById("assignedProjects").style.display = "none";
    document.getElementById("unassignedProjects").style.display = "none";
    document.getElementById("completedProjects").style.display = "block";
    document.getElementById("users").style.display = "none";

    
}
function users() {
    document.getElementById("createProject").style.display = "none";
    document.getElementById("assignedProjects").style.display = "none";
    document.getElementById("unassignedProjects").style.display = "none";
    document.getElementById("completedProjects").style.display = "none";
    document.getElementById("users").style.display = "block";
}
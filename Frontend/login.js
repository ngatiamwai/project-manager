
///////
    const loginPassword=document.querySelector('.loginPassword')
    const loginuserName=document.querySelector('.loginuserName')
    const loginForm=document.getElementById('loginForm')

    let token=''
    let userId=''

    loginForm.addEventListener('submit', (e)=>{
         e.preventDefault()

        let userlogin=loginuserName.value !=="" && loginPassword.value !==""
        if(userlogin){
            axios 
            .post(
                "http://localhost:5000/user/login",
        
                {
                  userName: loginuserName.value,
                  userPassword: loginPassword.value,
                },
        
                {
                  headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                  },
                }
              ).then((res)=>{
                console.log(res.data)
                //alert(res.data.message)
                userName=res.data.userName  
                localStorage.setItem('userName',userName) 
                userId=res.data.userId
                localStorage.setItem('id',userId)
                token=res.data.token
                localStorage.setItem('token',token)
                if(res.data.role=='admin'){
                    window.location.href='./createProject.html'
                }else if(res.data.role !=='admin'){
                    window.location.href='./userProjects.html'
                }   
              })
        }

    })


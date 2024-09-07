async function gettr(){
    let data = await fetch("https://c37ebc4c-8f89-49f7-bc20-30c8c34ad918-prod.e1-us-east-azure.choreoapis.dev/backend/chatapp/v1.0/api/login", {
        headers: {
            "Content-Type": "application/json",
          },
        method:"POST",
        body:JSON.stringify({username:"user1", password:"password1"})
    });
    
    console.log(await data.json());
}

gettr();
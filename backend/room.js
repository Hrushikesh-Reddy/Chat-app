async function gettr(){
    let data = await fetch("https://c37ebc4c-8f89-49f7-bc20-30c8c34ad918-prod.e1-us-east-azure.choreoapis.dev/backend/chatapp/v1.0/chat/get?reqdata[username]=user1", {
        headers: {
            "Content-Type": "application/json",
            "Auth": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpYXQiOjE3MjU3MTI2NjZ9.ru3hKTfd7apyGqHqampIaZ7-H4iy5D5bGj2Hg2Ta_IU"
          }/* ,
        method:"POST",
        body:JSON.stringify({username:"user1", password:"password1"}) */
    });
    
    console.log(await data.json());
}

gettr();
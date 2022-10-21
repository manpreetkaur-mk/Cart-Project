// Axios is a very popular JavaScript library you can use to perform HTTP requests, that works in both Browser and Node. js platforms.
var axios=require ("axios")

//node url
var ServerURL = "http://localhost:3003"

//mking 1st service , GET- when u want to read all data use get method , URL- url is action name ,Async- by help of async view nd services both work together for using async we use await , await means coming
const getData = async (url) => {
    try{
    var response = await fetch(`${ServerURL}/${url}`)
    //from node only json will go
    var result = await response.json()
    return result;
    }
    catch(e){
        console.log("Error",e)
        return null;
    }
}
//making 2nd service ,post -when you wnt to give response with parameter
//used when queriescontain parameters
const postDataAndImage = async (url,formData,confi)=>{
    try{
        const response = await axios.post(`${ServerURL}/${url}`,formData, {headers:{"content-type":"multipart/formData"}});
      const result = await response.data.result;
        return result;
    }catch(e){

        console.log("error- ",e)

    
        return null;
    }
}
const postDataAndImageWithId = async (url,formData)=>{
  try{
      const response = await axios.post(`${ServerURL}/${url}`,formData, {headers:{"content-type":"multipart/formData"}});
    const result = await response.data;
      return result;
  }catch(e){

      console.log("error- ",e)

  
      return null;
  }
}

const postData = async (url, body) => {
    try {
      const response = await fetch(`${ServerURL}/${url}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      return null;
    }
  
  }
//then we will export it
export{getData,postDataAndImage,ServerURL,postData,postDataAndImageWithId}
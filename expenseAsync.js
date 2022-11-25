var form = document.getElementById("my-form")
form.addEventListener("submit",onsubmit)

async function onsubmit(e){
    
    e.preventDefault()
    var amount = document.getElementById("amount").value
    var description = document.getElementById("des").value
    var category = document.getElementById("cat").value
    
    const expenseDetails = {
        amount,
        description,
        category
    }
try{
   let response= await axios.post("https://crudcrud.com/api/7d97b926eb69492da7a0af85d6afb62c/expense",expenseDetails)
    {
        
            showNewExpenseOnScreen(response.data);
            console.log(response);
 }
    }catch(err){
            console.log(err);
        }
}

window.addEventListener("DOMContentLoaded",async()=>{
    try
    {
   let Response= await axios.get("https://crudcrud.com/api/7d97b926eb69492da7a0af85d6afb62c/expense")
       {
            for(let i=0 ; i<Response.data.length ; i++){
                console.log(Response)
                showNewExpenseOnScreen(Response.data[i])

            }
        }
    }catch(err)
        {
            console.log(err);
        }
       
})

function showNewExpenseOnScreen(user){
    var parentNode = document.getElementById("users");
    var childHTML = `<li id = ${user._id}> ${user.amount} - ${user.description} -${user.category} 
                    <button onclick = deleteExpense('${user._id}')>Delete Expense</button>
                    <button onclick = editExpense('${user._id}','${user.amount}','${user.description}','${user.category}')>Edit Expense</button>
                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML  

    // clear fields
    document.getElementById("amount").value='';
     document.getElementById("des").value='';
     document.getElementById("cat").value='';
   
}

async function deleteExpense(id){
    try{

    
    axios.delete(`https://crudcrud.com/api/7d97b926eb69492da7a0af85d6afb62c/expense/${id}`)
    {
       
            removeExpense(id)
            // console.log(Response)
        }
    }catch(err){
            console.log(err)
        }
}

function removeExpense(id){
    var parentNode = document.getElementById("users")
    var childnode = document.getElementById(id)
    if(childnode){
        parentNode.removeChild(childnode)
    }
}
 function editExpense(id,amount,description,category){
    

    document.getElementById("amount").value = amount
    document.getElementById("des").value = description
    document.getElementById("cat").value = category;
      removeExpense(id)
    }
   
   

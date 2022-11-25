var form = document.getElementById("my-form")
form.addEventListener("submit",addExpense)

function addExpense(e){
    e.preventDefault()
    var amount = document.getElementById("amount").value
    var description = document.getElementById("des").value
    var category = document.getElementById("cat").value
    const expenseDetails = {
        amount,
        description,
        category
    }

    axios.post("https://crudcrud.com/api/3faa0ec0884f48cb9b1895e423efcdff/expense",expenseDetails)
        .then((Response)=>{
            console.log(Response)
            showNewExpenseOnScreen(Response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/3faa0ec0884f48cb9b1895e423efcdff/expense")
        .then((Response)=>{
            for(let i=0 ; i<Response.data.length ; i++){
                console.log(Response)
                showNewExpenseOnScreen(Response.data[i])

            }
        })
        .catch((err)=>{
            console.log(err)
        })
})

function showNewExpenseOnScreen(user){
    var parentNode = document.getElementById("users");
    var childHTML = `<li id = ${user._id}> ${user.amount} - ${user.description} -${user.category} 
                    <button onclick = deleteExpense('${user._id}')>Delete Expense</button>
                    <button onclick = editExpense('${user._id}','${user.amount}','${user.description}','${user.category}')>Edit Expense</button>
                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML  
   
}

function deleteExpense(id){
    axios.delete(`https://crudcrud.com/api/3faa0ec0884f48cb9b1895e423efcdff/expense/${id}`)
        .then((Response)=>{
            removeExpense(id)
            console.log(Response)
        })
        .catch((err)=>{
            console.log(err)
        })
}

function removeExpense(id){
    var parentNode = document.getElementById("users")
    var child = document.getElementById(id)
    if(child){
        parentNode.removeChild(child)
    }
}

function editExpense(id,amount,description,category){
    document.getElementById("amount").value = amount
    document.getElementById("des").value = description
    document.getElementById("cat").value = category;
    removeExpense(id)
}

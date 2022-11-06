const form=document.getElementById('my-form');
const amount=document.getElementById('amount');
const description=document.getElementById('des');

const category=document.getElementById('cat');

form.addEventListener('submit',onSubmit);

function onSubmit(e)
{
    e.preventDefault();
    let expenses=
    {
        amount:amount.value,
        description:description.value,
        category:category.value,
    }
    axios.post("https://crudcrud.com/api/16c7b78307f947e49bb55db3a5994ed5/expensetracker",expenses)
    .then((res)=>
        console.log(res)
        )
    ShowExpense(expenses);



}



window.addEventListener('DOMContentLoaded',()=>
{
    axios.get("https://crudcrud.com/api/16c7b78307f947e49bb55db3a5994ed5/expensetracker")
    .then((res)=>{
    console.log(res);
    for(var i=0;i<res.data.length;i++)
    {
        ShowExpense(res.data[i]);
    }
})
})

function ShowExpense(expense)
{
    const parentnde=document.getElementById('users');
    const childnode=`<li id="${expense._id}">${expense.category}:${expense.amount}:${expense.description}
    <button onclick=EditExpense('${expense.amount}','${expense.description}','${expense.category}','${expense._id}')>EDIT</button>
     <button onclick=DeleteExpense('${expense._id}')>DELETE</button>
    </li>`
    parentnde.innerHTML=parentnde.innerHTML + childnode;
    amount.value='';
    description.value='';
    category.value='';




}
function EditExpense(amount,description,category,expid)

{
  axios.get
    (`https://crudcrud.com/api/16c7b78307f947e49bb55db3a5994ed5/expensetracker/${expid}`)
    
    .then((res)=>
    {
         console.log(res)
        
          
    document.getElementById('amount').value=amount;
    document.getElementById('des').value=description;

     document.getElementById('cat').value=category;
    DeleteExpense(expid);
    })
    

   
    
}
function DeleteExpense(expenseid)
{
   axios
   .delete(`https://crudcrud.com/api/16c7b78307f947e49bb55db3a5994ed5/expensetracker/${expenseid}`)
   .then((res)=>{
    console.log(res);
   
    RemoveExpenseFromScreen(expenseid);

   })
   



}
function RemoveExpenseFromScreen(expenseid)
{
    const parentnde=document.getElementById('users');
    const childnode=document.getElementById(expenseid);
    if(childnode)
    {
        parentnde.removeChild(childnode);
    }
}

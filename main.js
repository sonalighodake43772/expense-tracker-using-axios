// form validation
const myForm = document.querySelector('#my-form');
const amount= document.querySelector('#amount');
const description = document.querySelector('#des');
const category = document.querySelector('#cat');

myForm.addEventListener('submit', onSubmit);



function onSubmit(e) {
  e.preventDefault();

  let expense =
  {
      amount: amount.value,
      description: description.value,
       category:category.value
 }

// localStorage.setItem(expense.category, JSON.stringify(expense));
axios
.post('https://crudcrud.com/api/691f63d6176447c2a43b20f0f40dd7c4/trackexpense',expense)
.then(res=>console.log(res));
ShowExpense(expense);
  }


  window.addEventListener('DOMContentLoaded',()=>
  {
    
    axios
.get('https://crudcrud.com/api/691f63d6176447c2a43b20f0f40dd7c4/trackexpense')
.then((res)=>{
console.log(res)
for(let i=0;i<res.data.length;i++)
{
  ShowExpense(res.data[i]);
}
})
.catch((err)=>
console.log(err))
  
})



  function ShowExpense(exp) {

  //  if(localStorage.getItem(exp.category)!==null)
  //  {
  //    deleteexpensefromscreen(exp.category);
  // }

  
   const parentnode=document.getElementById('users');
   const childnode= `<li id=${exp._id}> ${exp.amount} - ${exp.description} - ${exp.category}
    <button onclick=DeleteExpense('${exp._id}')> Delete expense </button>
    <button onclick=EditExpense('${exp.amount}','${exp.description}','${exp._id}')> Edit Expense </button>
    </li>`;

   parentnode.innerHTML=parentnode.innerHTML + childnode;
     amount.value = '';
    description.value = '';

  }

  // delete expense
function DeleteExpense(expenseid)
{
  // localStorage.removeItem(expenseid);
  axios
.delete(`https://crudcrud.com/api/691f63d6176447c2a43b20f0f40dd7c4/trackexpense/${expenseid}`)
.then((res)=>
{console.log(res)
deleteexpensefromscreen(expenseid);
})

}

// editexpense
function EditExpense(amount,description,expID)
{

document.getElementById("amount").value=amount;
 document.getElementById("des").value=description ;
//  document.getElementById("cat").value=category;
 DeleteExpense(expID);
 console.log(expID);
    
  
  }
  

  // remove expense from screen
function deleteexpensefromscreen(expenseid){
  const parentNode = document.getElementById('users');
  const childNode = document.getElementById(expenseid);
if(childNode)
{
 parentNode.removeChild(childNode);
}
}


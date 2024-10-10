import React,{useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
const AddForm = () => {
    const [username,setUsername]=useState('')
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [totalexpense,setTotalExpense]=useState('')
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')
    const url = 'http://127.0.0.1:5000/accounts';
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault(); 
            const expenseData = {
                username,
                firstname,
                lastname,
                Total_Expense: totalexpense,
                description,
                Category: category,
            };
    
            try {
                const response = await axios.post(url, expenseData);
                console.log('Expense added:', response.data);
            } catch (error) {
                console.error('Error adding expense:', error);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar/>
            <form>
                <div className='m-4 '>


                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Username</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" required placeholder="abc204" onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div class="row g-2">
                        <div class="col-md">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGrid"  onChange={(e)=>setFirstname(e.target.value)}/>
                                <label for="floatingInputGrid">Firstname</label>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGrid"  onChange={(e)=>setLastname(e.target.value)}/>
                                <label for="floatingInputGrid">Lastname</label>
                            </div>
                        </div>
                       
                    </div>
                    <div class="row g-2 mt-3">
                        <div class="col-md">
                            <div class="form-floating"> 
                                <input type="text" class="form-control" id="floatingInputGrid"  onChange={(e)=>setTotalExpense(e.target.value)}/>
                                <label for="floatingInputGrid">Expense</label>
                            </div>
                        </div>

                        <div class="col-md">
                            <div class="form-floating">
                                <select class="form-select" id="floatingSelectGrid" onChange={(e)=>setCategory(e.target.value)}>
                                    <option selected>Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Miscellaneous">Miscellaneous</option>
                                </select>
                                <label for="floatingSelectGrid">Category</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" onChange={(e)=>setDescription(e.target.value)} rows="3"></textarea>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>

                    <button type="submit" class="  btn btn-primary text-center " onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </>
    )
}

export default AddForm
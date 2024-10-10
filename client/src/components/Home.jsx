import React, { useEffect, useState } from 'react'
import ExpenseCard from './ExpenseCard'
import axios from 'axios'
import Navbar from './Navbar';

const Home = () => {
    const [expense, setExpense] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const url = 'http://127.0.0.1:5000';

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${url}/accounts`);
            setExpense(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        getExpenses();
    }, []);


    const deleteExpense = async (id) => {
        try {
            const res = await axios.delete(`${url}/accounts/${id}`)
            setExpense((prevExpenses) => prevExpenses.filter((exp) => exp.userId !== id));

            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }
    const updateDetails = async (id, updatedData) => {
        try {
            const res = await axios.put(`${url}/accounts/${id}`, updatedData)
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }
    const filteredExpenses = expense.filter(exp =>
    (exp.Category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return (
        <>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
            <h1 className='text-6xl item-center text-center m-2 p-2 underline bold uppercase drop-shadow-xl'>All Expenses</h1>
            <div className='row'>
                
                {searchTerm === ''
                    ? expense.map(exp => <ExpenseCard key={exp.userId} exp={exp} deleteExpense={deleteExpense} updateDetails={updateDetails}  />)
                    : filteredExpenses.map(exp => <ExpenseCard key={exp.userId} exp={exp} searchTerm={searchTerm} deleteExpense={deleteExpense} updateDetails={updateDetails} />)
                }
            </div>
        </>
    );
};


export default Home
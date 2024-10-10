import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({searchTerm,setSearchTerm}) => {
    // console.log(expense)
    return (
        <>
            
            <div className='flex p-4 m-2 bg-gray-100 rounded shadow'>
                <div className='text-2xl font-bold'>
                    <h1>Personal Expense Tracker</h1>
                </div>
                <div className='flex items-center ml-auto'>
                    <ul className='flex space-x-6'>
                        <Link to='/'>
                        <li className='text-lg hover:text-blue-600 cursor-pointer transition duration-300'>
                            All Expenses
                        </li>
                        </Link>
                        <Link to='/addExpense'>
                        <li className='text-lg hover:text-blue-600 cursor-pointer transition duration-300'>
                            Add Expenses
                        </li>
                        </Link>
                        <div className='relative inline-flex '>
                            <input type="text" className='border p-1 rounded-full shadow ' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                            <i className="bi bi-search absolute right-2 top-1/2 transform -translate-y-1/2"></i>
                        </div>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Navbar
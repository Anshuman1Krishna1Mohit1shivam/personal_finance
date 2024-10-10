import React, { useState } from 'react';

const ExpenseCard = ({ exp, deleteExpense, updateDetails,searchTerm}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState(exp.Category);
    const [description, setDescription] = useState(exp.description);
    const [totalExpense, setTotalExpense] = useState(exp.Total_Expense);
    // console.log(searchTerm)
    const handleUpdate = () => {
        updateDetails(exp.userId, { Category: category, description, Total_Expense: totalExpense });
        setIsEditing(false);
    };
    

    return (
        <div className="col-sm-4 mb-3 mb-sm-0 mt-3 m-4 p-4">
            <div className="bg-white border-r-2 border-b-2  border-black shadow shadow-lg rounded-lg p-4">
                <div className="flex justify-between">
                    <div className="flex-1">
                        <h5 className="text-xl font-semibold mb-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Category"
                                    className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                                />
                            ) : (
                                category
                            )}
                        </h5>
                        {isEditing ? (
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                            />
                        ) : (
                            <p className="text-gray-700 mb-2">{description}</p>
                        )}
                        {isEditing ? (
                            <input
                                type="number"
                                value={totalExpense}
                                onChange={(e) => setTotalExpense(e.target.value)}
                                placeholder="Total Expense"
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                            />
                        ) : (
                            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                                &#x20b9; {totalExpense}
                            </p>
                        )}
                        <p className="text-gray-500 text-sm">
                            <small>{exp.username}</small>
                        </p>
                    </div>
                    <div className="flex items-start">
                        {isEditing ? (
                            <>
                                <button className="bg-green-500 text-white rounded-lg p-2 m-1" onClick={handleUpdate}>
                                    <i className="bi bi-check"></i>
                                </button>
                                <button className="bg-gray-300 rounded-lg p-2 m-1" onClick={() => setIsEditing(false)}>
                                    <i className="bi bi-x"></i>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="bg-red-500 text-white rounded-lg p-2 m-1"
                                    onClick={() => deleteExpense(exp.userId)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button
                                    type="button"
                                    className="bg-yellow-500 text-white rounded-lg p-2 m-1"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExpenseCard;

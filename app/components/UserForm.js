'use client'
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserForm = () => { 

    const [userInput,setUserInput] = useState("")
    const [age,setAge] = useState(0)
    const [gender,setGender] = useState("")
    const [nationality,setNationality] = useState("")
    const [countryName,setCountryName] = useState("")
    
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await Promise.all([await axios.get(` https://api.agify.io?name=${userInput}`),
            await axios.get(` https://api.genderize.io?name=${userInput}`),
            await axios.get(` https://api.nationalize.io?name=${userInput}`)])
            const [ageResult,genderResult,nationalityResult] = response.map(ele=>ele.data)
            const {age}= ageResult
            const {gender}= genderResult 
            const {country} = nationalityResult 
            const maxProbablity = Math.max(...country.map(ele=>ele.probability))
            const finalCountry = country.find(country=>country.probability===maxProbablity)?.country_id
            const response2 = await axios.get(`https://restcountries.com/v3.1/alpha/${finalCountry}`)
            setAge(age)
            setGender(gender)
            setNationality(finalCountry)
            setCountryName(response2.data[0].name.common)
            setUserInput("")
        }
        catch(err){
            toast.error(err.response.data?.error || err.response.data?.message)
        }
       
    }

    return ( 
        <div className="userForm">
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}} placeholder="Enter your name"/>
                <input type="submit" value="submit" id="submit"/>
            </form>
            <div>
                {Boolean(age) && <p>I think your age is {age}.</p>}
                {gender && <p>Your gender is {gender}.</p>}
                {nationality && <p>..and you are from {countryName && <span>{countryName} -</span>} {nationality}.</p>}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default UserForm
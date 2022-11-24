import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFacing() {
    const [zipcode, setzipcode] = useState([])
    const [result, setResult] = useState([]);
    const [country, setCountry] = useState();
    const [longitude, setLongitude] = useState();

    const [latitude, setLatitude] = useState();
    const [msoa, setMsoa] = useState();
    const [region, setRegion] = useState();
    const [activity, setActivity] = useState("");
    const [listData, setlistData] = useState([]);
    const [userinput, setUserinput]= useState(null);
    function addActivity() {
        // setlistData([...listData,activity])
        // console.log(listData)
        setlistData((listData) => {
            const updateList = [...listData, activity]
            setActivity("");
            console.log(updateList)
            return updateList;

        })
    }
    function addUserInput(e){
        setUserinput(e.target.value);
    }
    useEffect(() => {
        console.log(userinput);
        axios.get('https://api.postcodes.io/postcodes/'+{userinput})
            .then(res => {
                console.log(res)
                setCountry(res.data.result.country);
                setLongitude(res.data.result.longitude);
                // setzipcode(res.data.response)
                setResult(res);
                console.log("This is the result " + result.data);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function fetchZipcode(){
        console.log(userinput);
        axios.get('https://api.postcodes.io/postcodes/'+userinput)
        .then(res => {
            console.log(res)
            setCountry(res.data.result.country);
            setLongitude(res.data.result.country.longitude);

            // setCountry(res.data.result.country.longitude);
            // setzipcode(res.data.response)
            setResult(res);
            console.log("This is the result " + result.data);

        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <div className='container'>
                <div className='header'>Check the post code</div>

                <input type="text" placeholder="Search Post Code :  OX49 5NU" onChange={addUserInput} />
                <button onClick={fetchZipcode}>Search</button>
                <p className='list-heading'>Here is the search country Postcode:</p>
                <p className="userinput-value">Your Search: {userinput}</p>
                {/* {listData != [] && listData.map((data, i) => {
                    return (
                        <>
                            <p key={i}>
                                <div className='listData'>{data}</div>
                            </p>
                        </>
                    )

                })} */}
                <p className="userinput-value">Country is : {country}</p>
                <p className="userinput-value">longitude is : {longitude}</p>
                <p className="userinput-value">latitude is : {latitude}</p>
                <p className="userinput-value">msoa is : {msoa}</p>
                <p className="userinput-value">region is : {region}</p>

            </div>
        </>

    )
}
export default DataFacing
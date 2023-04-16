import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import NewJobModal from '../components/newJobModal'

function home() {
    const [profile, setProfile] = useState({})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchProfile = async () => {
            try {
                const res = await axios({
                    url: 'https://localhost:7130/api/Users/Profile',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProfile(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()
    }, [])

    return (
        <div className="relative h-full">
            <ToastContainer />
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 hover:from-green-400 hover:to-green-700 rounded-full absolute right-0 bottom-0 text-white w-24 h-24 m-8"
            >
                <i className="mdi mdi-plus text-8xl"></i>
            </button>
            <NewJobModal showModal={showModal} />

            <div>{JSON.stringify(profile)}</div>
        </div>
    )
}

export default home

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateUserByAdmin} from "../../actions/admin";
import Swal from "sweetalert2";

export default function UpdateForm({user}) {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: '',
        email: '',
        born_year: '',
        password: ''
    })

    const [avatar, setAvatar] = useState()

    useEffect(() => {
        if (user) setData(user)
    }, [user])


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const nameField = document.querySelector('input[name="name"]')
        const emailField = document.querySelector('input[name="email"]')
        const bornYearField = document.querySelector('input[name="born_year"]')
        const passwordField = document.querySelector('input[name="password"]')

        formData.append('name', nameField.value)
        formData.append('email', emailField.value)
        formData.append('born_year', bornYearField.value)
        formData.append('password', passwordField.value)
        formData.append('avatar', fileField.files[0])

        if (
            !data.name ||
            !data.password ||
            !data.email ||
            !data.born_year
        ) return

        dispatch(updateUserByAdmin(user._id, formData))

        Swal.fire('Дані оновлено, оновіть сторінку!')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-wrapper center p-10 box h-670'>

                <h2>{data.name}</h2>
                <div>
                    <label>Name*
                        <input
                            type="text"
                            name='name'
                            className='pl-15'
                            value={data.name}
                            onChange={({target: {value}}) => setData({...data, name: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Born year*
                        <input
                            type="number"
                            name='born_year'
                            className='pl-15'
                            value={data.born_year}
                            required
                            onChange={({target: {value}}) => setData({...data, born_year: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Email*
                        <input
                            type="email"
                            name='email'
                            className='pl-15'
                            value={data.email}
                            required
                            onChange={({target: {value}}) => setData({...data, email: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Password*
                        <input
                            type="password"
                            name='password'
                            className='pl-15'
                            value={data.password}
                            onChange={({target: {value}}) => setData({...data, password: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Avatar*
                        <input
                            type="file"
                            name='avatar'
                            className='pl-15'
                            value={avatar}
                            onChange={({target: {value}}) => setAvatar(value)}
                        />
                    </label>
                </div>

                <button type='submit' className='center btn-create mt-20'>Зберегти</button>
            </form>
        </div>
    )
}

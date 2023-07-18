import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createPub, getAllSortedPubs, updatePub} from "../../actions/pubs";
import {useNavigate} from "react-router-dom";

export default function CreateForm({currentId, setCurrentId}) {
    const dispatch = useDispatch()
    const history = useNavigate()

    const pub = useSelector((state) =>
        currentId && state.pubs.pubs.data ? state.pubs.pubs.data.find((pub) => pub._id === currentId) : null)

    const user = JSON.parse(localStorage.getItem('profile'))

    const [data, setData] = useState(
        {
            name: '',
            address: '',
            contact: '',
            tags: '',
            order: '',
            description: '',
            schedule: '',
            category: '',
            createdBy: '',
            avatar: ''})

    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        if (pub) setData(pub)

    }, [pub])

    const clear = () => {
        setCurrentId(0);
        setData({
            name: '',
            address: '',
            contact: '',
            tags: '',
            order: '',
            description: '',
            schedule: '',
            category: '',
            createdBy: '',
            avatar: ''
        })
        setAvatar()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const nameField = document.querySelector('input[name="name"]')
        const addressField = document.querySelector('input[name="address"]')
        const contactField = document.querySelector('input[name="contact"]')
        const descriptionField = document.querySelector('input[name="description"]')
        const orderField = document.querySelector('input[name="order"]')
        const tagsField = document.querySelector('input[name="tags"]')
        const scheduleField = document.querySelector('input[name="schedule"]')
        const categoryField = document.querySelector('select[name="category"]')
        const createdField = user._id

        formData.append('name', nameField.value)
        formData.append('address', addressField.value)
        formData.append('contact', contactField.value)
        formData.append('description', descriptionField.value)
        formData.append('order', orderField.value)
        formData.append('tags', tagsField.value)
        formData.append('schedule', scheduleField.value)
        formData.append('createdBy', createdField)
        formData.append('category', categoryField.value)
        formData.append('avatar', fileField.files[0])

        try {
            setLoading(true)

            const query = '?page=1'

            if (currentId) {
                dispatch(updatePub(currentId, formData))
            } else {
                await dispatch(createPub(formData))
                dispatch(getAllSortedPubs(query))
            }


        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)

        }
    }

    return (
        <div id='create-form'
             style={{display: 'none'}}
             className='mt-105 mb-40 animate__animated animate__bounceInDown'>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <div className='mt-10'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    placeholder='Name'
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={({target: {value}}) => setData({...data, name: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Address'
                                    name="address"
                                    type="text"
                                    value={data.address}
                                    onChange={({target: {value}}) => setData({...data, address: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Contact'
                                    name="contact"
                                    type="text"
                                    value={data.contact}
                                    onChange={({target: {value}}) => setData({...data, contact: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Tags'
                                    name="tags"
                                    type="text"
                                    value={data.tags}
                                    onChange={({target: {value}}) => setData({...data, tags: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Order'
                                    name="order"
                                    type="text"
                                    value={data.order}
                                    onChange={({target: {value}}) => setData({...data, order: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Description'
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={({target: {value}}) => setData({...data, description: value})}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Schedule'
                                    type="text"
                                    name="schedule"
                                    value={data.schedule}
                                    onChange={({target: {value}}) => setData({...data, schedule: value})}
                                />
                            </div>
                            <div className='center-vertical'>
                                <select
                                    name='category'
                                    className='select-nav w-select3'
                                    onChange={({target: {value}}) => setData({...data, category: value})}
                                    defaultValue='SORT'>
                                    <option disabled value="SORT">Категорія</option>
                                    <option value='wedding'>Для весілля</option>
                                    <option value='club'>Клуб</option>
                                    <option value='hookah'>Кальянна</option>
                                    <option value='bar'>Бар</option>
                                    <option value='restaurant'>Ресторан</option>
                                    <option value='cafe'>Кафе</option>
                                    <option value='office-party'>Для корпоративу</option>
                                    <option value='birthday'>Для дня народження</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type='file'
                                    name='avatar'
                                    onChange={({target: {files}}) => setAvatar( files[0])}
                                />
                            </div>
                            {currentId ? <button type='submit' className='mt-22'>
                                    Update
                                </button> :
                                <button
                                    type='submit'
                                    className='mt-22'
                                    disabled={!data.name || !data.address ||
                                    !data.contact || !data.tags || !data.order ||
                                    !data.description || !data.schedule || !avatar || loading}
                                >Create
                                </button>}
                        </form>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            {currentId ? <h1>Update your pub!</h1> : <h1>Add new pub!</h1>}
                            <p>Enter details of pub and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

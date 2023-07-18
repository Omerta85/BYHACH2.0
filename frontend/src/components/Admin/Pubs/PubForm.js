import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePub, updatePub} from "../../../actions/pubs";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubForm({currentId, setCurrentId}) {
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1

    const pub = useSelector((state) =>
        currentId ? state.pubs.pubs.data.find((pub) => pub._id === currentId) : null)

    const [data, setData] = useState({
        name: '',
        address: '',
        contact: '',
        tags: '',
        order: '',
        description: '',
        schedule: ''
    })
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
            schedule: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const nameField = document.querySelector('input[name="name"]')
        const addressField = document.querySelector('input[name="address"]')
        const contactField = document.querySelector('input[name="contact"]')
        const descriptionField = document.querySelector('input[name="description"]')
        const orderField = document.querySelector('input[name="order"]')
        const tagsField = document.querySelector('input[name="tags"]')
        const scheduleField = document.querySelector('input[name="schedule"]')

        formData.append('name', nameField.value)
        formData.append('address', addressField.value)
        formData.append('contact', contactField.value)
        formData.append('description', descriptionField.value)
        formData.append('order', orderField.value)
        formData.append('tags', tagsField.value)
        formData.append('schedule', scheduleField.value)
        formData.append('avatar', fileField.files[0])

        if (
            !data.name ||
            !data.address ||
            !data.contact ||
            !data.tags ||
            !data.order ||
            !data.description ||
            !data.schedule
        ) return

        if (currentId) {
            dispatch(updatePub(currentId, formData))
        } else {
            const response = await fetch('/pubs', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            dispatch({type: 'CREATE', payload: data})
            console.log(data)
        }
    }

    return (
        <div className='w-33'>
            <button className='btn-link' onClick={() => {
                clear()
            }}>Clear Form</button>

            <form onSubmit={handleSubmit}
                  id='createPubsForm'
                  className='form-wrapper center p-10 box h-780 shadow'>
                <h2>{currentId ? <div>{data.name}</div> : 'Create pub'}</h2>
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
                <div>
                    <label>Address*
                        <input
                            type="text"
                            name='address'
                            className='pl-15'
                            value={data.address}
                            required
                            onChange={({target: {value}}) => setData({...data, address: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Contact*
                        <input
                            type="number"
                            name='contact'
                            className='pl-15'
                            value={data.contact}
                            required
                            onChange={({target: {value}}) => setData({...data, contact: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Tags*
                        <input
                            type="text"
                            name='tags'
                            className='pl-15'
                            value={data.tags}
                            required
                            onChange={({target: {value}}) => setData({...data, tags: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Order*
                        <input
                            type="number"
                            name='order'
                            className='pl-15'
                            value={data.order}
                            required
                            onChange={({target: {value}}) => setData({...data, order: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Description*
                        <input
                            type="text"
                            name='description'
                            className='pl-15'
                            value={data.description}
                            required
                            onChange={({target: {value}}) => setData({...data, description: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Schedule*
                        <input
                            type="text"
                            name='schedule'
                            className='pl-15'
                            value={data.schedule}
                            onChange={({target: {value}}) => setData({...data, schedule: value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Avatar*
                        <input
                            type="file"
                            className='pl-15'
                            value={avatar}
                            onChange={({target: {value}}) => setAvatar(value)}
                        />
                    </label>
                </div>

                {currentId ?
                    <div className='d-flex j-content-between w-100'>
                        <button
                            onClick={() => {
                                dispatch(deletePub(pub._id, page))
                                clear()
                            }}
                            className='btn-create btn-delete mt-20'>Delete
                        </button>
                        <button type='submit' className=' btn-create mt-20'>Save</button>
                    </div> :
                    <button type='submit' className='center btn-create mt-20'>Create</button>
                }
            </form>
        </div>
    )
}

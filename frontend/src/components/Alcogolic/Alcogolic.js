import {useDispatch} from "react-redux";
import {useState} from "react";
import {addToOffer} from "../../actions/offer";

export default function Alcogolic() {

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const pubname = JSON.parse(localStorage.getItem('pubname'))


    const [data, setData] = useState(
        {
            name: '',
            date: '',
            time: '',
            goal: '',
            phone_number: '',
            sex: '',
            telegram: '',
            quantity: '',
            paid: '',
            sum: ''
        })

    console.log(data)

    const [loading, setLoading] = useState(false)


    const clear = () => {
        setData({
            name: '',
            date: '',
            time: '',
            goal: '',
            phone_number: '',
            telegram: '',
            sex: '',
            quantity: '',
            paid: '',
            sum: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        const dateField = document.querySelector('input[name="date"]')
        const timeField = document.querySelector('input[name="time"]')
        const goalField = document.querySelector('input[name="goal"]')
        const numberField = document.querySelector('input[name="phone_number"]')
        const telegramField = document.querySelector('input[name="telegram"]')
        const sexField = document.querySelector('select[name="sex"]')
        const quantityField = document.querySelector('input[name="quantity"]')
        const paidField = document.querySelector('select[name="paid"]')
        const sumField = document.querySelector('select[name="sum"]')

        formData.append('name', pubname)
        formData.append('date', dateField.value)
        formData.append('time', timeField.value)
        formData.append('goal', goalField.value)
        formData.append('phone_number', numberField.value)
        formData.append('telegram', telegramField.value)
        formData.append('sex', sexField.value)
        formData.append('quantity', quantityField.value)
        formData.append('paid', paidField.value)
        formData.append('sum', sumField.value)

        if (
            !data.date ||
            !data.time ||
            !data.goal ||
            !data.phone_number ||
            !data.telegram ||
            !data.sex ||
            !data.quantity ||
            !data.paid ||
            !data.sum
        ) return

        try {
            setLoading(true)

            dispatch(addToOffer(user._id, formData))

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
            clear()
        }
    }


    return (
        <div>
            <div
                className='mt-105 mb-40 animate__animated animate__bounceInDown'>
                <div className="container alco-container" id="container">
                    <div className="form-container sign-in-container">
                        <div className='mt-10'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        value={pubname}
                                        readOnly={true}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Оберіть дату зустрічі'
                                        name="date"
                                        type="date"
                                        value={data.date}
                                        onChange={({target: {value}}) => setData({...data, date: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Оберіть час зустрічі'
                                        name="time"
                                        type="time"
                                        value={data.time}
                                        onChange={({target: {value}}) => setData({...data, time: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Мета зустрічі'
                                        name="goal"
                                        type="text"
                                        value={data.goal}
                                        onChange={({target: {value}}) => setData({...data, goal: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Номер тел'
                                        name="phone_number"
                                        type="text"
                                        value={data.phone_number}
                                        onChange={({target: {value}}) => setData({...data, phone_number: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Telegram'
                                        name="telegram"
                                        type="text"
                                        value={data.telegram}
                                        onChange={({target: {value}}) => setData({...data, telegram: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Quantity'
                                        name="quantity"
                                        type="text"
                                        value={data.quantity}
                                        onChange={({target: {value}}) => setData({...data, quantity: value})}
                                    />
                                </div>
                                <div>
                                    <div>
                                        <select
                                            name='sex'
                                            onChange={({target: {value}}) => setData({...data, sex: value})}
                                            className='select-nav w-select1'
                                            defaultValue='sex'
                                        >
                                            <option disabled value="sex">Стать</option>
                                            <option value="Чоловік">Чоловік</option>
                                            <option value="Жінка">Жінка</option>
                                            <option value="Будь-хто">Будь-хто</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <select
                                            name='paid'
                                            onChange={({target: {value}}) => setData({...data, paid: value})}
                                            className='select-nav w-select1'
                                            defaultValue='paid'
                                        >
                                            <option disabled value="paid">Оплата</option>
                                            <option selected value="Я">Я</option>
                                            <option value="Партнер">Партнер</option>
                                            <option value="Навпіл">50/50</option>
                                        </select>
                                    </div>

                                    <div>
                                        <select
                                            name='sum'
                                            className='select-nav w-select1'
                                            onChange={({target: {value}}) => setData({...data, sum: value})}
                                            defaultValue='sum'
                                        >
                                            <option value="sum">Витрати</option>
                                            <option value="до 200">До 200</option>
                                            <option value="до 500">До 500</option>
                                            <option value="до 800">До 800</option>
                                            <option value="1000+">1000+</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className='mt-22 btn-create'
                                    disabled={ !data.date ||
                                    !data.time || !data.goal || !data.phone_number || !data.telegram ||
                                    !data.sex || !data.quantity || !data.paid || !data.sum || loading}
                                >Create
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-right">
                                <h1>Знайдіть Бухача для душі.</h1>
                                <p>Введіть дані, щоб Вам було легше підібрати колегу.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

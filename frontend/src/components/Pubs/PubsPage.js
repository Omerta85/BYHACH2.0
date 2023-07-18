import Pubs from "./Pubs";
import CreateForm from "./CreateForm";
import {useEffect, useState} from "react";
import {getAllSortedPubs} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import PaginationItems from "./Pagination";
import {useNavigate, useLocation} from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Slider, TextField} from "@material-ui/core";
import * as React from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubsPage() {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1
    // const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const history = useNavigate()

    const [loading, setLoading] = useState(false)
    const [sliderMax, setSliderMax] = useState(1000)
    const [orderRange, setOrderRange] = useState([25, 100])
    const [filter, setFilter] = useState('')
    const [sorting, setSorting] = useState('')
    const [category, setCategory] = useState('')

    const location = useLocation()

    const params = location.search ? location.search : null

    const {pubs} = useSelector((state) => state.pubs)
    console.log(pubs)

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)
            try {
                let query

                if (params && !filter) {
                    query = params
                } else {
                    query = filter
                }

                if (category) {
                    if (query.length === 0) {
                        query = `?${category}`
                    } else {
                        query = query + `&${category}`
                    }
                }

                if (sorting) {
                    if (query.length === 0) {
                        query = `?${sorting}`
                    } else {
                        query = query + `&${sorting}`
                    }
                }

                if (search) {
                    if (query.length === 0) {
                        query = `?name=${search}`
                    }
                }

                if (tags[0]) {
                    if (query.length === 0) {
                        query = `?tags=${tags.join(',')}`
                    }
                }

                if (page && !filter && !sorting && !category && !search && !tags[0]) {
                    query = `?page=${page}`
                }

                await dispatch(getAllSortedPubs(query))

                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()


    }, [dispatch, filter, params, sorting, category, page])

    const sliderCommitHandler = (e, newValue) => {
        buildRangeFilter(newValue)
    }

    const onTextFieldCommitHandler = () => {
        buildRangeFilter(orderRange);
    };

    const buildRangeFilter = (newValue) => {
        const urlFilter = `?order.gte=${newValue[0]}&order.lte=${newValue[1]}`

        setFilter(urlFilter)

        history.push(urlFilter)
    }

    const handlePriceInputChange = (e, type) => {
        let newRange;

        if (type === "lower") {
            newRange = [...orderRange];
            newRange[0] = Number(e.target.value);

            setOrderRange(newRange);
        }

        if (type === "upper") {
            newRange = [...orderRange];
            newRange[1] = Number(e.target.value);

            setOrderRange(newRange);
        }
    };

    const handleNewSortSubmit = ({target: {value}}) => {

        if (value === '-order') {
            setSorting('sortBy=order&order=asc')
        } else if (value === 'order') {
            setSorting('sortBy=order&order=desc')
        } else if (value === 'name') {
            setSorting('sortBy=name&order=desc')
        } else if (value === '-createdAt') {
            setSorting('sortBy=createdAt&order=asc')
        } else if (value === 'createdAt') {
            setSorting('sortBy=createdAt&order=desc')
        } else if (value === '-ratings') {
            setSorting('sortBy=ratings&order=asc')
        }
    }

    const handleCategorySubmit = ({target: {value}}) => {
        if (value === 'hookah') {
            setCategory('category=hookah')
        } else if (value === 'bar') {
            setCategory('category=bar')
        } else if (value === 'cafe') {
            setCategory('category=cafe')
        } else if (value === 'wedding') {
            setCategory('category=wedding')
        } else if (value === 'birthday') {
            setCategory('category=birthday')
        } else if (value === 'office-party') {
            setCategory('category=office-party')
        } else if (value === 'club') {
            setCategory('category=club')
        }

    }

    const clearAllFilters = () => {
        setFilter("");
        setSorting("");
        setCategory('');
        setOrderRange([25, 100]);

        setSearch('')
        setTags([])

        history.push(`/pubs?page=${page}`);
    };

    const searchPub = () => {
        if (search) {
            history.push(`/pubs?name=${search}`)
        } else if (tags) {
            history.push(`/pubs?tags=${tags.join(',')}`)
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


    const showVisible = () => {
        const input = document.getElementById('create-form');
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    }

    // const handleKeyPress = (e) => {
    //     if (e.keyCode === 13){
    //         searchPub()
    //     }
    // }

    return (
        <div className='w-100 center-box'>
            <div className=' d-flex center-box center-nav mb-40 w-85'>
                <div className='mr-20 d-flex'>


                </div>

                <div className='d-flex center-nav'>
                    <div className='search-input'>
                        <input
                            type='text'
                            value={search}
                            // onKeyDown={handleKeyPress}
                            placeholder='Пошук по закладах...'
                            onChange={({target: {value}}) => setSearch(value)}
                        />
                    </div>
                    <div className='ml-20'>
                        <ChipInput
                            type='text'
                            value={tags}
                            placeholder='Пошук по тегах...'
                            onAdd={(chip) => handleAdd(chip)}
                            onDelete={(chip) => handleDelete(chip)}
                            className='mr-20 ml-20 w-200'
                            id='tags-input'
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchPub}/>
                    <div className=' ml-20 center-vertical'>
                        <div><FontAwesomeIcon icon={faPlus} className='icon' onClick={showVisible}/></div>
                    </div>
                </div>
            </div>

            <div className='w-80 center-box'>

                <Slider
                    min={0}
                    max={sliderMax}
                    value={orderRange}
                    valueLabelDisplay='auto'
                    onChange={(e, newValue) => setOrderRange(newValue)}
                    onChangeCommitted={sliderCommitHandler}
                />
            </div>

            <div className='d-flex w-90 center-box mb-40 jc-sa'>
                <TextField
                    size='small'
                    id='lower'
                    label='Min Order'
                    type='number'
                    disabled={loading}
                    value={orderRange[0]}
                    onChange={(e) => handlePriceInputChange(e, "lower")}
                    onBlur={onTextFieldCommitHandler}/>
                <TextField
                    size='small'
                    id='upper'
                    label='Max Order'
                    type='number'
                    disabled={loading}
                    value={orderRange[1]}
                    onChange={(e) => handlePriceInputChange(e, "upper")}
                    onBlur={onTextFieldCommitHandler}/>

                <div className='center-vertical'>
                    <select className='select-nav w-select2' onChange={handleNewSortSubmit} defaultValue='SORT'>
                        <option disabled value="SORT">Сортування</option>
                        <option value='-order'>Середній чек: від найдорожчих</option>
                        <option value='order'>Середній чек: від найдешевших</option>
                        <option value='name'>Назва: за алфавітом</option>
                        <option value='-createdAt'>Новіші</option>
                        <option value='createdAt'>Старіші</option>
                        <option value='-ratings'>За популярністю</option>
                    </select>
                </div>

                <div className='center-vertical'>
                    <select className='select-nav w-select3' onChange={handleCategorySubmit} defaultValue='SORT'>
                        <option disabled value="SORT">Категорія</option>
                        <option value='wedding'>Для весілля</option>
                        <option value='club'>Клуб</option>
                        <option value='hookah'>Кальянна</option>
                        <option value='bar'>Бар</option>
                        <option value='cafe'>Кафе</option>
                        <option value='office-party'>Для корпоративу</option>
                        <option value='birthday'>Для дня народження</option>
                    </select>
                </div>

                <button className='btn-create center-vertical' size="small" onClick={clearAllFilters}>
                    <div className='d-flex'>
                        <div className='mt-auto'>Очистити</div>
                        <div>
                            <FontAwesomeIcon className='remove-icon' icon={faBackspace}/>
                        </div>
                    </div>
                </button>

            </div>

            <CreateForm currentId={currentId} setCurrentId={setCurrentId}/>
            <Pubs setCurrentId={setCurrentId} pubs={pubs.data}/>
            <PaginationItems page={page}/>
        </div>
    )
}

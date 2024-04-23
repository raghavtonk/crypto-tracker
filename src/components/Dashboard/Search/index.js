
import './styles.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
export default function Search({inputValue,onChange}){
    return(
        <div className='search-flex'>
            <SearchRoundedIcon />
            <input  placeholder='Search' value={inputValue} onChange={(event)=>onChange(event)}/>
        </div>
    )
}
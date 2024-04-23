import './styles.css'
export default function Button({children,onClick,outlined}){
    return(
        <div className={outlined ?"outlined-btn" :"btn"} onClick={()=>onClick()}>{children}</div>
    )
}
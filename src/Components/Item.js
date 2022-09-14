
import './Item.css';

const Item = ({menu}) => {
    return(
        <article>
            <span>{menu.id}</span>
            <span>{menu.name}</span>
            <span>{menu.price}</span>
        </article>
    )
}

export default Item;
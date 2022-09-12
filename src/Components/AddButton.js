import "./AddButton.css";
import buttonImg from "../assets/buttonImg.svg";

const AddButton = ({ openModal }) => {
  
  return (
    <div>
      <img className="addButton" src={buttonImg} onClick={openModal}></img>
    </div>
  );
};

export default AddButton;

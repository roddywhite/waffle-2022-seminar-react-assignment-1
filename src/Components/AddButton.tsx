import "./AddButton.css";
import buttonImg from "../assets/buttonImg.svg";

const AddButton = () => {
  return (
    <div>
      <img className="addButton" src={buttonImg}></img>
    </div>
  );
};

export default AddButton;

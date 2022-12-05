import "./AddButton.scss";
import buttonImg from "../assets/buttonImg.svg";

const AddButton = () => {
  return (
    <div>
      <img className="addButton" src={buttonImg} alt="추가"></img>
    </div>
  );
};

export default AddButton;

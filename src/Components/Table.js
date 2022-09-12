import "./Table.css";

const Table = ({ menus }) => {

  return (
      <table className="table">
        <thead className="th">
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>가격</th>
          </tr>
        </thead>

        <tbody className="tb">
          {menus.map((menu) => (
            <tr className="tr" onClick={select}>
              <td className="tdId">{menu.id}</td>
              <td className="tdName">{menu.name}</td>
              <td className='tdPrice'>{menu.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

  );
};

export default Table;

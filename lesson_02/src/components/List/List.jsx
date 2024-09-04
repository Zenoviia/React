import React, { useState, useEffect } from "react";
import { animals } from "../../mockedData/mockedData";
import "./List.css";
import { generateRandomIndex } from "../../utils/utils";

export default function List() {
  const [list, setList] = useState(animals.map(animal => ({ ...animal, active: false })));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const inactiveIndices = list
        .map((item, index) => !item.active ? index : -1)
        .filter(index => index !== -1);

      if (inactiveIndices.length === 0) {
        clearInterval(intervalId);
        return;
      }

      const randomIndex = generateRandomIndex(inactiveIndices); 
      if (randomIndex === null) return;

      const indexToActivate = inactiveIndices[randomIndex];

      setList(prevList =>
        prevList.map((item, index) =>
          index === indexToActivate ? { ...item, active: true } : item
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [list]);

  return list.length ? (
    <table className="table">
      <tbody>
        {list.map((item, index) => (
          <tr key={index} className={item.active ? "active" : ""}>
            <td>{item.type}</td>
            <td>{item.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
}

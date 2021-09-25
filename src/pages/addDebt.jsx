import React, { useState } from "react";

import { CircularProgress, Modal } from "@mui/material";
import { postDebt } from "../services/debts";
import regexMoney from "../utils/regexMoney";

import "../styles/modal.scss";

const AddDebt = (props) => {
  const [client, setClient] = useState(1);
  const [justify, setJustify] = useState("");
  const [value, setValue] = useState();
  const [errorMessage, setErrorMessage] = useState([null, null]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  function send() {
    const err = [];
    if (justify === "") err.push("Campo obrigatório");
    else err.push(null);
    if (value === "" || value === undefined) err.push("Campo obrigatório");
    else if (value <= 0 || !regexMoney(value)) err.push("Valor inválido");
    else err.push(null);

    setErrorMessage(err);

    if (err[0] === null && err[1] === null) {
      setLoadingAdd(true);
      postDebt({
        client,
        justify,
        value,
        onClose: () => props.onClose(),
        recall: () => props.recall(),
        loading: () => setLoadingAdd(false),
      });
    } else console.log("erro");
  }

  return (
    <>
      <Modal open={props.open} className="modal">
        <div
          className={`container container-${window.sessionStorage.getItem(
            "mode"
          )}`}
        >
          <h2 className="title">Cadastrar dívida</h2>
          <div className="form">
            <div>Cliente</div>
            <select type="text" onChange={(e) => setClient(e.target.value)}>
              {props.users.map((user) => (
                <option key={user.user.id} value={user.user.id}>
                  {user.user.name}
                </option>
              ))}
            </select>
            <div>Motivo</div>
            <input
              type="text"
              placeholder="motivo"
              onChange={(e) => setJustify(e.target.value)}
            />
            <span>{errorMessage[0]}</span>
            <div>Valor</div>
            <input
              type="number"
              placeholder="Ex: 500.00"
              min="0"
              onChange={(e) => setValue(e.target.value)}
            />
            <span>{errorMessage[1]}</span>
          </div>
          <div className="option-buttons">
            {loadingAdd && <CircularProgress />}
            <button
              className="confirm"
              onClick={() => send()}
              disabled={loadingAdd}
            >
              Enviar
            </button>
            <button
              className="cancel"
              onClick={props.onClose}
              disabled={loadingAdd}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddDebt;

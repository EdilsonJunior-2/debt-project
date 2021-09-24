import React, { useEffect, useState } from "react";

import { Modal, CircularProgress } from "@mui/material";
import { editDebt } from "../services/debts";
import regexMoney from "../utils/regexMoney";
import "../styles/modal.scss";

const EditDebt = (props) => {
  const [justify, setJustify] = useState();
  const [value, setValue] = useState();
  const [errorMessage, setErrorMessage] = useState([null, null]);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    setJustify(props.debt?.motivo);
    setValue(props.debt?.valor);
  }, [props.open]);

  function send() {
    const err = [];
    if (justify === "") err.push("Campo obrigatório");
    else err.push(null);
    if (value === "" || value === undefined) err.push("Campo obrigatório");
    else if (value <= 0 || !regexMoney(value)) err.push("Valor inválido");
    else err.push(null);

    setErrorMessage(err);

    if (err[0] === null && err[1] === null) {
      setLoadingEdit(true);
      editDebt({
        id: props.debt.id,
        client: props.userId,
        justify,
        value,
        onClose: () => props.onClose(),
        recall: () => props.recall(),
        loading: () => setLoadingEdit(false),
      });
    }
  }

  return (
    <Modal open={props.open} className="modal">
      <div className="container">
        <h2 className="title">Editar dívida</h2>
        <div className="form">
          <div>Cliente: {props.user.name}</div>

          <div>Motivo</div>
          <input
            type="text"
            placeholder="motivo"
            value={justify}
            onChange={(e) => setJustify(e.target.value)}
          />
          <span>{errorMessage[0]}</span>
          <div>Valor</div>
          <input
            type="number"
            placeholder="Ex: 500.00"
            value={value}
            min="0"
            onChange={(e) => setValue(e.target.value)}
          />
          <span>{errorMessage[1]}</span>
        </div>
        <div className="option-buttons">
          {loadingEdit && <CircularProgress />}
          <button
            className="confirm"
            onClick={() => send()}
            disabled={loadingEdit}
          >
            Enviar
          </button>
          <button
            className="cancel"
            onClick={() => props.onClose()}
            disabled={loadingEdit}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditDebt;

import React, { useState } from "react";

import { Modal, CircularProgress } from "@mui/material";
import { deleteDebt } from "../services/debts";

import "../styles/modal.scss";

const DeleteDebt = (props) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  function send() {
    setLoadingDelete(true);
    deleteDebt({
      id: props.debt.id,
      onClose: props.onClose,
      recall: props.recall,
      loading: () => setLoadingDelete(false),
    });
  }

  return (
    <Modal open={props.open} className="modal">
      <div
        className={`container container-${window.sessionStorage.getItem(
          "mode"
        )}`}
      >
        <h1>Deletar dívida</h1>
        <div className="info">
          Cliente: <span>{props.debt.userName}</span>
        </div>
        <div className="info">
          Motivo da dívida: <span>{props.debt.justify}</span>
        </div>
        <div className="info">
          Valor: <span>R${props.debt.value}</span>
        </div>
        <div></div>
        <div className="option-buttons">
          {loadingDelete && <CircularProgress />}
          <button
            className="confirm"
            onClick={() => send()}
            disabled={loadingDelete}
          >
            Deletar
          </button>
          <button
            className="cancel"
            onClick={() => props.onClose()}
            disabled={loadingDelete}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDebt;

import React, { useEffect, useState } from "react";

//tag imports
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

//pages
import AddDebt from "./addDebt";
import EditDebt from "./editDebt";
import DeleteDebt from "./deleteDebt";

//components
import ToastAnimated from "../components/toast";

//icons and assets
import logoWhite from "../assets/logo-white.png";
import logoDark from "../assets/logo-dark.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

//utils and reqs
import { getDebts, getUsers } from "../services/debts";
import { debtLevel, organizeUsersDebts } from "../utils";
import { returnDate } from "../utils/returnDate";

//style
import "../styles/home.scss";

function Home() {
  const [array, setArray] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [item1, setItem1] = useState();
  const [item2, setItem2] = useState();
  const [item3, setItem3] = useState();
  const [item4, setItem4] = useState();
  const [item5, setItem5] = useState();
  const [recall, setRecall] = useState(false);
  const [mode, setMode] = useState(
    window.sessionStorage.getItem("mode")
      ? window.sessionStorage.getItem("mode")
      : "light"
  );

  useEffect(() => {
    const promise = [];
    promise.push(getUsers());
    promise.push(getDebts());
    Promise.all(promise)
      .then((res) => organizeUsersDebts(res))
      .then((res) => setArray(res));

    if (!window.sessionStorage.getItem("mode")) {
      window.sessionStorage.setItem("mode", mode);
    }
  }, [recall]);

  const openModalAdd = () => {
    setAddItem(!addItem);
  };

  const openModalDelete = (props) => {
    setItem1(props?.debtUser);
    setItem2(props?.justify);
    setItem3(props?.date);
    setItem4(props?.id);
    setItem5(props?.value);
    setDeleteItem(!deleteItem);
  };

  const openModalEdit = (props) => {
    setItem1(props?.userName);
    setItem2(props?.userId);
    setItem3(props?.debt);
    setEditItem(!editItem);
  };

  function handleMode(event, newMode) {
    console.log(newMode);
    newMode && setMode(newMode);
    window.sessionStorage.setItem("mode", newMode);
  }

  return (
    <div className={`home-container home-container-${mode}`}>
      <div id="header">
        <a href="https://www.connvert.com.br" target="blank">
          <img src={mode === "light" ? logoDark : logoWhite} alt="logo" />
        </a>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleMode}
          aria-label="background mode"
          style={{
            background: mode === "light" ? "#F3F3F3" : "#34526d",
          }}
        >
          <ToggleButton value="light" aria-label="light">
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div id="debts">
        {array.map((user) => {
          return (
            <Accordion key={user.user.id} className="debt">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="debt-title"
              >
                <Typography className="debt-user">{user.user.name}</Typography>
              </AccordionSummary>
              <AccordionDetails className="debt-details">
                {user.debts.length !== 0 ? (
                  user.debts.map((debt) => {
                    const debt_level = debtLevel(debt.created_at);
                    const date = returnDate(debt.created_at);
                    return (
                      <div
                        className="debt-text-container"
                        key={debt.created_at}
                      >
                        <div className="debt-text debt-reason">
                          Justificativa: <span>{debt.motivo}</span>
                        </div>
                        <div className="debt-text debt-value">
                          Valor: <span>R${debt.valor}</span>
                        </div>
                        <div className="debt-text debt-level">
                          Data: <span>{date}</span>
                        </div>
                        <div className="debt-text debt-level">
                          <span style={{ color: debt_level.color }}>
                            {debt_level.level}
                          </span>
                        </div>
                        <div className="debt-text debt-options">
                          <EditIcon
                            onClick={() =>
                              openModalEdit({
                                userName: user.user.name,
                                userId: user.user.id,
                                debt,
                              })
                            }
                          />
                          <DeleteIcon
                            onClick={() =>
                              openModalDelete({
                                debtUser: user.user.name,
                                justify: debt.motivo,
                                date: date,
                                id: debt.id,
                                value: debt.valor,
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="debt-text-container">
                    <div className="debt-text">
                      Este usuário não possui dívidas associadas a ele
                    </div>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
        <div id="add-debt"></div>
        <AddDebt
          open={addItem}
          recall={() => setRecall(!recall)}
          onClose={openModalAdd}
          setArray={setArray}
          users={array}
        />
        <EditDebt
          open={editItem}
          recall={() => setRecall(!recall)}
          setArray={setArray}
          user={{ name: item1, id: item2 }}
          debt={item3}
          onClose={openModalEdit}
        />
        <DeleteDebt
          open={deleteItem}
          onClose={openModalDelete}
          debt={{
            userName: item1,
            justify: item2,
            date: item3,
            id: item4,
            value: item5,
          }}
          recall={() => setRecall(!recall)}
        />
      </div>
      <button id="add-debt-button" onClick={() => openModalAdd()}>
        <AddIcon />
      </button>
      <ToastAnimated />
    </div>
  );
}

export default Home;

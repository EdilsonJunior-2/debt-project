import { api, usersApi } from "./api";
import { showToast } from "../components/toast";

export async function getDebts() {
  const debts = await api.get("/divida");
  return debts.data;
}

export async function getUsers() {
  const users = await usersApi.get();
  return users.data;
}

export async function postDebt(props) {
  await api
    .post("/divida", {
      idUsuario: props.client,
      motivo: props.justify,
      valor: props.value,
    })
    .then(() => {
      props.recall();
      showToast({
        type: "success",
        message: "Dívida adicionada com sucesso!",
      });
      props.loading();
      props.onClose();
    })
    .catch(() => {
      showToast({
        type: "error",
        message: "Ops, houve algum erro inesperado!",
      });
      props.loading();
      props.onClose();
    });
}

export async function editDebt(props) {
  await api
    .put(`/divida/${props.id}`, {
      idUsuario: props.client,
      motivo: props.justify,
      valor: props.value,
    })
    .then(() => {
      props.recall();
      showToast({
        type: "success",
        message: "Dívida editada com sucesso!",
      });
      props.loading();
      props.onClose();
    })
    .catch(() => {
      showToast({
        type: "error",
        message: "Ops, houve algum erro inesperado!",
      });
      props.loading();
      props.onClose();
    });
}

export async function deleteDebt(props) {
  await api
    .delete(`/divida/${props.id}`)
    .then(() => {
      props.recall();
      showToast({
        type: "success",
        message: "Dívida excluída com sucesso!",
      });
      props.loading();
      props.onClose();
    })
    .catch((err) => {
      console.log(err);
      showToast({
        type: "error",
        message: "Ops, houve algum erro inesperado!",
      });
      props.loading();
      props.onClose();
    });
}

import { api, usersApi, uuid } from "./api";
import { showToast } from "../components/toast";

export async function getDebts() {
  const debts = await api.get(`/divida?uuid=${uuid}`);
  return debts.data.result;
}

export async function getUsers() {
  const users = await usersApi.get();
  return users.data;
}

export async function postDebt(props) {
  await api
    .post(`/divida?uuid=${uuid}`, {
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
    .put(`/divida/${props.id}?uuid=${uuid}`, {
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
    .delete(`divida/${props.id}?uuid=${uuid}`)
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
      showToast({
        type: "error",
        message: "Ops, houve algum erro inesperado!",
      });
      props.loading();
      props.onClose();
    });
}

export default function organizeUsersDebts(props) {
  const finalArray = [];
  props[0].map((user) => {
    const debts = props[1].filter((element) => element.idUsuario === user.id);
    finalArray.push({ user: user, debts: debts });
  });
  return finalArray;
}

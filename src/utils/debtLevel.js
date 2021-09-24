import { timeVariation } from "./returnDate";

export default function debtLevel(created_at) {
  const variation = timeVariation(created_at);

  if (0 <= variation && variation < 3)
    return { level: `${variation} dias de atraso`, color: "#00C781" };
  else if (3 <= variation && variation < 7)
    return { level: `${variation} dias de atraso`, color: "#22E9A3" };
  else if (7 <= variation && variation < 14)
    return { level: `${variation} dias de atraso`, color: "#FFAA15" };
  else if (14 <= variation && variation < 30)
    return { level: `${variation} dias de atraso`, color: "#E56060" };
  else if (variation >= 30)
    return { level: `${variation} dias de atraso`, color: "#911C1C" };
  else return { level: "dívida futura? Temos um McFly aqui", color: "#0420fc" };
}

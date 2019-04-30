export async function getAthletes() {
  const response = await fetch("/atletas/mercado");
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

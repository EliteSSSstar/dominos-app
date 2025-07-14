export async function GET(req) {
  console.log("in the weather api page");

  const res2 = await fetch('http://api.weatherapi.com/v1/current.json?key=e5c67c36b5314f66aaf134827251407&q=Dublin&aqi=no'); //update 17july
  const data = await res2.json();

  console.log(data.current.temp_c);

  const currentTemp = data.current.temp_c;

  return Response.json({ temp: currentTemp });
}

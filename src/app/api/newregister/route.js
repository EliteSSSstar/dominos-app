
export async function GET(request) {
  const { searchParams } = new URL(request.url);


  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")



  // get the values

  // that were sent across to us.

  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const tel = searchParams.get('tel');
  const address = searchParams.get('address');
  const email2 = searchParams.get('email2');
  const pass2 = searchParams.get('pass2');

  console.log(email, pass, tel, address, email2, pass2);


 


  // database call goes here


  // at the end of the process we need to send something back.

  return Response.json({ message: "Received", data: { email, pass, tel, address } });

}
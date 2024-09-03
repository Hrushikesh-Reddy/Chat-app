import Form from "../Components/Form";

export default function Login() {
  return (
    <>
    <p>[Test :- Username : user1, Password: password1]</p>
      <Form method="login" route="/api/login" />
    </>
  );
}

import { Toast } from "../../../components/Toast";
import { emailValidator } from "../../../helpers/email-validator";
import { navigateTo } from "../../../router";
import { getUsers } from "../../../services/get-users";

export function LoginViewComponent() {
  const $root = document.getElementById("root") as HTMLDivElement | null;
  if (!$root) throw new Error("Element root not found")

  $root.innerHTML = /*html*/ `
    <div class="container">
      <h1>Acceso</h1>
      <form id="form-login">
          <div>
              <label for="">Correo electronico: </label>
              <input type="email" name="email" id="email" required>
          </div>
          <div>
              <label for="">Contraseña: </label>
              <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta?</p>
      <button id="btn-register">Registrate</button>
    </div>
  `;
  const logic = () => {
    const $formLogin = document.getElementById("form-login") as HTMLFormElement | null;
    const $emailInput = document.getElementById("email") as HTMLInputElement | null;
    const $passwordInput = document.getElementById("password") as HTMLInputElement | null;
    const $submitButtonLogin = document.querySelector('[type="submit"]') as HTMLButtonElement | null;

    if (!$formLogin) throw new Error("Form login not found")
    if (!$emailInput) throw new Error("Email input not found")
    if (!$passwordInput) throw new Error("Password input not found")
    if (!$submitButtonLogin) throw new Error("submit not found")

    $formLogin.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Desactivamos el botón para hacer submit
      $submitButtonLogin.setAttribute("aria-busy", "true");

      // Validar el correo
      const isValidEmail = emailValidator($emailInput.value);
      if (!isValidEmail) {
        Toast("Email no válido. Corrígelo.");
        $submitButtonLogin.removeAttribute("aria-busy");
        return;
      }
      
      // Valida usuario
      //  usuarios
      const users = await getUsers();

      // email 
      const foundUser = users.find((user) => {
        return user.email === $emailInput.value;
      });

      if (!foundUser) {
        alert("No tienes cuenta. Registrate");
        $submitButtonLogin.removeAttribute("disabled");
        return;
      }
      

      if ($passwordInput.value !== foundUser.password) {
        // En el caso de tener cuenta. Validar la contraseña
        $submitButtonLogin.removeAttribute("disabled");
        return Toast("Email o contraseña invalida, intenta de nuevo.");
      }

      const { password: _, ...userRestOfProperties } = foundUser; // usuario excepto la contraseña
      localStorage.setItem("user", JSON.stringify(userRestOfProperties));
      navigateTo("/posts");
    }); // Fin submit listener

    //evento clic boton registrarse
    const $buttonRegister = document.getElementById("btn-register") as HTMLButtonElement | null ;
    if (!$buttonRegister) throw new Error("regiter button not found")

    $buttonRegister.addEventListener("click", () => {
      navigateTo("/register");
    });
  }; // Fin logic
  logic();
} //Fin LoginPageComponent

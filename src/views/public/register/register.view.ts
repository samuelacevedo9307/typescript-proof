import { Toast } from "../../../components/Toast";
import { emailValidator } from "../../../helpers/email-validator";
import { IUser } from "../../../interfaces/user";
import { navigateTo } from "../../../router";
import { register } from "../../../services/auth/register";
import { getUsers } from "../../../services/get-users";

export function RegisterViewComponent() {
  const $root = document.getElementById("root");
  if (!$root) throw new Error("root element not found");

  $root.innerHTML = /*html*/ `
    <main class="container">
      <div class="form-container">
        <h1>Registro</h1>
        <form id="form-register">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <div>
          <p>¿Tienes cuenta?</p>
          <button id="login-btn">Inicia sesión</button>
        </div>
      </div>
    </main>
  `;

  // Logica del Registro
  const $formRegister = document.getElementById("form-register") as HTMLFormElement | null;

  const $nameInput = document.getElementById("name") as HTMLInputElement | null;
  const $emailInput = document.getElementById("email") as HTMLInputElement | null;
  const $passwordInput = document.getElementById("password") as HTMLInputElement | null;
  const $submitButtonRegister = document.querySelector('[type="submit"]') as HTMLButtonElement | null;

  if (!$formRegister) throw new Error("Form register not found")
  if (!$nameInput) throw new Error("Name input not found")
  if (!$emailInput) throw new Error("Email input not found")
  if (!$passwordInput) throw new Error("Password input not found")
  if (!$submitButtonRegister) throw new Error("Submit not found")

  $formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Desactivamos el botón para hacer submit
    $submitButtonRegister.setAttribute("aria-busy", "true");

    // Validar el correo
    const isValidEmail = emailValidator($emailInput.value);
    if (!isValidEmail) {
      Toast("Email no válido. Corrígelo.");
      $submitButtonRegister.removeAttribute("aria-busy");
      return;
    }
    //
    // usuarios
    const users = await getUsers();
    //  email
    const foundUser = users.find((user) => user.email === $emailInput.value);

    if (foundUser) {
      alert("Usuario ya registrado.");
      $submitButtonRegister.removeAttribute("disabled");
      return;
    }
    
    let registeredUser: IUser | null = null;
    try {
      registeredUser = await register($nameInput.value, $emailInput.value, $passwordInput.value);
    } catch (error) {
      Toast("Error al crear el usuario");
    }
    if(!registeredUser) return;


    const { password: _, ...userRestOfProperties } = registeredUser; // objeto LocalStorage
    localStorage.setItem("user", JSON.stringify(userRestOfProperties));

    Toast("Registro exito. Redirigiendo al Home");

    navigateTo("/posts");
  });

  const $loginButton = document.getElementById("login-btn") as HTMLButtonElement | null;
  if (!$loginButton) throw new Error("Login button not found");

  $loginButton.addEventListener("click", () => {
    navigateTo("/login");
  });
}

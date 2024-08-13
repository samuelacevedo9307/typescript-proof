import { logOut } from "../helpers/log-out";

export function PrivateLayout(contentHtml: string, contentLogic: () => void) {
  const $root = document.getElementById("root") as HTMLDivElement | null;
  if (!$root) throw new Error("Element root not found")

  $root.innerHTML = /*html*/ `
    <header class="container">
      <button id="log-out-btn">Cerrar sesión</button>
    </header>
    <div>${contentHtml}</div>
  `;
  contentLogic();
 
  const $buttonLogOut = document.getElementById("log-out-btn") as HTMLButtonElement | null;
  if(!$buttonLogOut) throw new Error("Logout button not found");
  

  $buttonLogOut.addEventListener("click", () => {
    logOut();
  });
}
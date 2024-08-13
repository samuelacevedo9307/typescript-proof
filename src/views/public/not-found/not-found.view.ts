import { navigateTo } from "../../../router";

export function NotFoundViewComponent() {
  const $root = document.getElementById("root") as HTMLDivElement | null;
  if (!$root) throw new Error("Element root not found")

  $root.innerHTML = /*html*/ `
    <div class="container">
      <h1>Not found</h1>
      <button id="return-home">Volver al home</button>
    </div>
  `;
  const logic = () => {
    const $buttonHome = document.getElementById('return-home') as HTMLButtonElement | null
    if (!$buttonHome) throw new Error("button home not found");
    $buttonHome.addEventListener('click', () => {
        navigateTo('/posts')
    }) 
  }; // Fin logic
  logic();
}
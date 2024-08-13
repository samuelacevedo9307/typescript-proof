import { Router } from "./router";
import "toastify-js/src/toastify.css";
import "@picocss/pico";
import './style.css'

function App() {
    const $root = document.getElementById('root') as HTMLDivElement | null;
    if (!$root) throw new Error("Root element not found");

    Router()
}

App();
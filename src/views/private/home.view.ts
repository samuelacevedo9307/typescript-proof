import { TViewComponent } from "../../router";
import { getPosts } from "../../services/posts";

export const HomeViewComponent: TViewComponent = () => {

  const html = /*html*/`
    <main class="container">
      <h2>Posts</h2>
      <div id="namePost"></div>
      <!-- <input type="text" id="namePost"> -->
    </main>
  `
  
  const logic = () => {
    
  }
   async function loadPosts() {
        try {
            const posts = await getPosts(); // Obtener los posts desde el servicio
            const namePost = document.getElementById("namePost") as HTMLDivElement | null;
           
            if (!namePost) throw new Error("Element namePost not found");
            
            // Generar el HTML para cada post
            const postHTML = posts.map((post:any) => /*html*/`
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                      <button id="buttonDeletePost" type="submit">eliminar</button>
                      <button id="buttonEditPost" type="submit">edit</button>
                </div>
            `).join('');

            // Insertar los posts en el contenedor
          namePost.innerHTML = postHTML;
         
        } catch (error) {
            console.error("Error loading posts:", error);
        }
      
    }
    
    loadPosts(); // Cargar los posts cuando se monta el componente
  return { html, logic }
  
}

import { API_URL } from "../constants";
import { IPost, IPostWithoutId } from "../interfaces/post";


export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const posts: IPost[] = await response.json()
  return posts;
}

export async function createPost(basePost: IPostWithoutId) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(basePost),
    });
    
    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
    
    return await response.json() as IPost
  } catch (err) {
    console.error("Error al crear post", err);
    throw err;
  }  
} 

//editar
export async function updatePost(postId: number, postToUpdate: IPostWithoutId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToUpdate),
    });
    
    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
    
    return await response.json() as IPost
  } catch (err) {
    console.error(`Error al editar el post con id: ${postId}`, err);
    throw err;
  }  
} 
//borrar
export async function deletePost(postId: number, postToDelete: IPostWithoutId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToDelete),
    });
    
    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
    
    return await response.json() as IPost
  } catch (err) {
    console.error(`Error al eliminar el post con id: ${postId}`, err);
    throw err;
  }  
} 



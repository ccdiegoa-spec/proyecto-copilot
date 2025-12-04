document.addEventListener('DOMContentLoaded', () => {
  // --- MODELO DE DATOS ---
  let posts = [
    {
      id: 1,
      title: 'Post #1: Introducción a las Tablas Hash',
      content: 'Definición, conceptos clave y una ilustración visual de cómo una función hash genera un índice.',
      link: 'posts/post1.html'
    },
    {
      id: 2,
      title: 'Post #2: Manejo de Colisiones',
      content: 'Comparación entre Encadenamiento y Direccionamiento Abierto (Linear, Quadratic, Double Hashing).',
      link: 'posts/post2.html'
    },
    {
      id: 3,
      title: 'Post #3: Implementación y Operaciones Fundamentales',
      content: 'Detalles de insertar, buscar y eliminar con ejemplos y código en JavaScript.',
      link: 'posts/post3.html'
    }
  ];

  // --- REFERENCIAS AL DOM ---
  const postList = document.getElementById('post-list');
  const newPostBtn = document.getElementById('new-post-btn');
  const postFormContainer = document.getElementById('post-form-container');
  const postForm = document.getElementById('post-form');
  const cancelBtn = document.getElementById('cancel-btn');
  const postTitleInput = document.getElementById('post-title');
  const postContentInput = document.getElementById('post-content');
  const postIdInput = document.getElementById('post-id');

  // --- FUNCIONES ---

  /**
   * Renderiza la lista de posts en el DOM.
   */
  const renderPosts = () => {
    postList.innerHTML = ''; // Limpiar la lista actual
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2><a href="${post.link || '#'}">${post.title}</a></h2>
        <p>${post.content}</p>
        <div class="post-actions">
          <button class="edit-btn" data-id="${post.id}">Editar</button>
          <button class="delete-btn" data-id="${post.id}">Eliminar</button>
        </div>
      `;
      postList.appendChild(article);
    });
  };

  /**
   * Muestra u oculta el formulario de posts.
   * @param {boolean} show - True para mostrar, false para ocultar.
   * @param {object|null} post - El post a editar, o null para un post nuevo.
   */
  const showForm = (show, post = null) => {
    postTitleInput.value = post ? post.title : '';
    postContentInput.value = post ? post.content : '';
    postIdInput.value = post ? post.id : '';
    postFormContainer.style.display = show ? 'block' : 'none';
    newPostBtn.style.display = show ? 'none' : 'block';
  };

  /**
   * Maneja el envío del formulario para crear o editar un post.
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();
    const id = postIdInput.value;

    if (id) { // Editando un post existente
      posts = posts.map(p => p.id === parseInt(id) ? { ...p, title, content } : p);
    } else { // Creando un nuevo post
      const newPost = {
        id: Date.now(), // ID único basado en el timestamp
        title,
        content,
        link: '#' // Los nuevos posts no tienen un archivo HTML asociado
      };
      posts.push(newPost);
    }

    renderPosts();
    showForm(false);
  };

  /**
   * Maneja los clics en los botones de "Editar" y "Eliminar".
   */
  const handlePostActions = (event) => {
    const target = event.target;
    const id = parseInt(target.dataset.id);

    if (target.classList.contains('delete-btn')) {
      if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
        posts = posts.filter(p => p.id !== id);
        renderPosts();
      }
    }

    if (target.classList.contains('edit-btn')) {
      const postToEdit = posts.find(p => p.id === id);
      if (postToEdit) {
        showForm(true, postToEdit);
      }
    }
  };

  // --- ASIGNACIÓN DE EVENTOS ---
  newPostBtn.addEventListener('click', () => showForm(true));
  cancelBtn.addEventListener('click', () => showForm(false));
  postForm.addEventListener('submit', handleFormSubmit);
  postList.addEventListener('click', handlePostActions);

  // --- INICIALIZACIÓN ---
  renderPosts();
});
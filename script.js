            // Função para salvar accordions no Local Storage
            function saveAccordions() {
                const accordions = document.querySelectorAll('.accordion');
                /*Aqui, document.querySelectorAll('.accordion') busca todos os elementos da página que possuem 
                a classe accordion. Isso retorna uma lista de todos os accordions.*/
                const accordionData = Array.from(accordions).map(accordion => {
                    /*Array.from(accordions) transforma o NodeList (que é uma lista de elementos 
                    retornados pela query) em um array de verdade. O método map é usado para iterar
                    sobre cada accordion, criando um novo array com os dados relevantes (título, corpo e status de completado).*/
                    const title = accordion.querySelector('.accordion-header span').textContent;
                    const body = accordion.querySelector('.accordion-body p').textContent;
                    /*O querySelector busca dentro de cada accordion o elemento com a classe 
                    .accordion-header span (normalmente o título do accordion) e .accordion-body 
                    p (normalmente o conteúdo).Em seguida, textContent extrai o texto contido nesses  
                    elementos.*/
                    const isCompleted = accordion.querySelector('.accordion-header span').classList.contains('completed');
                    /*Aqui, a função verifica se o título do accordion contém a classe completed. Isso indica se o accordion 
                    está marcado como "completado" ou não, retornando um valor booleano (true ou false).*/
                    return { title, body, isCompleted };
                });
                localStorage.setItem('accordions', JSON.stringify(accordionData));
                /*A função localStorage.setItem é usada para salvar os dados no armazenamento local do navegador.
                Como o localStorage só aceita strings, o array accordionData é convertido para uma string em formato
                 JSON com JSON.stringify.*/
            }
    
            // Função para carregar accordions do Local Storage
            function loadAccordions() {
                const accordionContainer = document.getElementById('accordion-container');
                const savedAccordions = JSON.parse(localStorage.getItem('accordions')) || [];
    
                savedAccordions.forEach(data => {
                    const newAccordion = document.createElement('div');
                    newAccordion.className = 'accordion';
    
                    newAccordion.innerHTML = `
                        <button class="accordion-header">
                            <span class="${data.isCompleted ? 'completed' : ''}">${data.title}</span>
                            <i class="fa-solid fa-chevron-down arrow"></i>
                        </button>
                        <div class="accordion-body">
                            <p>${data.body}</p>
                        </div>
                    `;
                    accordionContainer.appendChild(newAccordion);
                    attachAccordionEvent(newAccordion);
                });
            }
    
            document.getElementById('addAccordion').addEventListener('click', function () {
                const accordionContainer = document.getElementById('accordion-container');
    
                // Criar elementos para editar título e corpo do accordion
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = 'Digite o título do accordion';
                
                const bodyTextarea = document.createElement('textarea');
                bodyTextarea.placeholder = 'Digite o conteúdo do accordion';
                
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Salvar Accordion';
    
                // Adicionar os campos de edição e botão de salvar ao container
                accordionContainer.appendChild(titleInput);
                accordionContainer.appendChild(bodyTextarea);
                accordionContainer.appendChild(saveButton);
    
                // Evento de salvar accordion personalizado
                saveButton.addEventListener('click', function () {
                    const newAccordion = document.createElement('div');
                    newAccordion.className = 'accordion';
    
                    newAccordion.innerHTML = `
                        <button class="accordion-header">
                            <span>${titleInput.value || 'Título padrão'}</span>
                            <i class="fa-solid fa-chevron-down arrow"></i>
                        </button>
                        <div class="accordion-body">
                            <p>${bodyTextarea.value || 'Conteúdo padrão'}</p>
                        </div>
                    `;
                    
                    accordionContainer.appendChild(newAccordion);
                    titleInput.remove();
                    bodyTextarea.remove();
                    saveButton.remove();
                    
                    // Limpar campos de entrada após adicionar o accordion
                    titleInput.value = '';
                    bodyTextarea.value = '';
    
                    // Anexar evento de clique para o novo accordion
                    attachAccordionEvent(newAccordion);
    
                    // Salvar os accordions no Local Storage
                    saveAccordions();
                });
            });
    
            // Função para gerenciar evento de abrir/fechar accordion
            function attachAccordionEvent(accordionElement) {
                const header = accordionElement.querySelector('.accordion-header');
                const body = accordionElement.querySelector('.accordion-body');
    
                header.addEventListener('click', function () {
                    body.classList.toggle('open');
                    accordionElement.classList.toggle('open'); // Marca o accordion como aberto
                });
            }
    
            // Remove last accordion
            document.getElementById('removeAccordion').addEventListener('click', function () {
                const accordionContainer = document.getElementById('accordion-container');
                if (accordionContainer.lastElementChild) {
                    accordionContainer.removeChild(accordionContainer.lastElementChild);
                    saveAccordions(); // Atualizar o Local Storage após remoção
                }
            });
    
            // Evento para "Concluir um afazer"
            document.getElementById('completeTask').addEventListener('click', function () {
                const openAccordion = document.querySelector('.accordion.open');
    
                if (openAccordion) {
                    const titleElement = openAccordion.querySelector('.accordion-header span');
                    titleElement.classList.add('completed'); // Adicionar a classe "completed" para riscar e mudar a cor
                    openAccordion.classList.remove('open'); // Remover a classe "open" após concluir
                    
                    saveAccordions(); // Salvar o estado atualizado no Local Storage
                }
            });
    
            // Carregar os accordions salvos ao carregar a página
            window.onload = function () {
                loadAccordions();
            };

            const user = JSON.parse(localStorage.getItem('userData'));
            if (user) {
                document.getElementById('userInfo').textContent = `${user.username}`;
            }

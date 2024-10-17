// Estructura del árbol
let treeData = null;

// Función para crear el árbol
function createTree(node) {
    const div = document.createElement('div');
    div.className = 'node';
    div.innerText = node.value;

    if (node.left || node.right) {
        const container = document.createElement('div');
        container.className = 'node-container';

        // Crear el nodo izquierdo
        if (node.left) {
            const leftChild = createTree(node.left);
            container.appendChild(leftChild);
        } else {
            container.appendChild(document.createElement('div')); // Espacio vacío
        }

        // Crear el nodo derecho
        if (node.right) {
            const rightChild = createTree(node.right);
            container.appendChild(rightChild);
        } else {
            container.appendChild(document.createElement('div')); // Espacio vacío
        }

        div.appendChild(container);
    }

    return div;
}

// Función para agregar un nodo al árbol
function addNode(value) {
    const newNode = { value: value, left: null, right: null };

    if (!treeData) {
        treeData = newNode; // Si el árbol está vacío, el nuevo nodo es la raíz
    } else {
        let current = treeData;
        while (true) {
            if (value < current.value) {
                // Insertar a la izquierda
                if (!current.left) {
                    current.left = newNode; // Agregar a la izquierda
                    break;
                }
                current = current.left;
            } else {
                // Insertar a la derecha
                if (!current.right) {
                    current.right = newNode; // Agregar a la derecha
                    break;
                }
                current = current.right;
            }
        }
    }

    // Actualizar el árbol en el DOM
    const treeElement = document.getElementById('tree');
    treeElement.innerHTML = ''; // Limpiar el árbol existente
    treeElement.appendChild(createTree(treeData)); // Renderizar el nuevo árbol
}

// Función para mostrar los recorridos del árbol
function traverseTree(node) {
    if (!node) return { inOrder: [], preOrder: [], postOrder: [] };

    const left = traverseTree(node.left);
    const right = traverseTree(node.right);

    return {
        inOrder: [...left.inOrder, node.value, ...right.inOrder],
        preOrder: [node.value, ...left.preOrder, ...right.preOrder],
        postOrder: [...left.postOrder, ...right.postOrder, node.value],
    };
}

// Manejar el envío del formulario
document.getElementById('treeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nodeValue = document.getElementById('nodeValue').value.trim();

    // Validación para asegurarse de que sea un número
    const value = Number(nodeValue);
    if (isNaN(value)) {
        alert('Por favor, ingresa un valor numérico válido.');
        return;
    }

    addNode(value); // Agregar el número al árbol
    document.getElementById('nodeValue').value = ''; // Limpiar el campo de entrada
});

// Manejar el clic en el botón de recorridos
document.getElementById('traverseButton').addEventListener('click', function() {
    if (!treeData) {
        alert('El árbol está vacío. Agrega nodos antes de mostrar los recorridos.');
        return;
    }

    const traversals = traverseTree(treeData);
    document.getElementById('traversals').innerHTML = `
        <h3>Recorridos del Árbol:</h3>
        <p><strong>In-Orden:</strong> ${traversals.inOrder.join(', ')}</p>
        <p><strong>Pre-Orden:</strong> ${traversals.preOrder.join(', ')}</p>
        <p><strong>Post-Orden:</strong> ${traversals.postOrder.join(', ')}</p>
    `;
});

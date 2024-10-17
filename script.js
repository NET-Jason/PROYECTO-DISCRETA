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

        if (node.left) {
            const leftChild = createTree(node.left);
            container.appendChild(leftChild);
        } else {
            container.appendChild(document.createElement('div')); // Espacio vacío
        }

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
    document.getElementById('tree').innerHTML = ''; // Limpiar el árbol existente
    document.getElementById('tree').appendChild(createTree(treeData)); // Renderizar el nuevo árbol
}

// Manejar el envío del formulario
document.getElementById('treeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nodeValue = document.getElementById('nodeValue').value;

    // Convertir la cadena de entrada en un array de números
    const values = nodeValue.split('').map(Number);
    values.forEach(value => addNode(value)); // Agregar cada número al árbol

    document.getElementById('nodeValue').value = ''; // Limpiar el campo de entrada
});
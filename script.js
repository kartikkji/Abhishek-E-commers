// Function to handle the WhatsApp redirection
function buyOnWhatsApp(productName, productPrice) {
    const whatsappNumber = '9310170486'; // Replace with your WhatsApp number (with country code)
    const message = `Hi, I'm interested in buying the product: ${productName} (Price: ${productPrice}). Please provide me with more details.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Product data array
const products = [
    {
        id: 1,
        name: 'Shotcrete Nozzle Tip',
        image: 'images/product1.jpg',
        price: '₹2,500',
        description: 'Durable polyurethane tip for shotcrete machines. Ensures precise spray application.'
    },
    {
        id: 2,
        name: 'Boom Placer Hose',
        image: 'images/product2.jpg',
        price: '₹12,000',
        description: 'High-pressure flexible hose for Boom Placer concrete pumps. Resists abrasion and wear.'
    },
    {
        id: 3,
        name: 'Rotor & Stator Kit',
        image: 'images/product3.jpg',
        price: '₹25,000',
        description: 'Complete kit for Shotcrete pump repair. Ensures consistent material flow and pressure.'
    },
    {
        id: 4,
        name: 'Delivery Elbow',
        image: 'images/product4.jpg',
        price: '₹7,500',
        description: 'Steel elbow with a robust design, suitable for high-pressure concrete delivery systems.'
    },
    {
        id: 5,
        name: 'Coupling Clamp',
        image: 'images/product5.jpg',
        price: '₹950',
        description: 'Heavy-duty quick release clamp for secure pipe connections. Galvanized for rust resistance.'
    },
    {
        id: 6,
        name: 'Concrete Pump Seal',
        image: 'images/product6.jpg',
        price: '₹1,500',
        description: 'High-quality rubber seal for pump cylinders. Prevents leaks and maintains pressure.'
    }
    // Add more products here
];

// This script will only run on the products page
if (document.getElementById('product-grid')) {
    const productGrid = document.getElementById('product-grid');

    // Generate product cards from the products array
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="whatsapp-button" onclick="buyOnWhatsApp('${product.name}', '${product.price}')">
                    <i class="fab fa-whatsapp"></i> Buy on WhatsApp
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}
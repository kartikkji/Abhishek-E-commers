// Configuration
const WHATSAPP_NUMBER = '919310170486';
const COMPANY_NAME = 'SPARE PARTS';

// Data for 9 categories and their products with fixed images
const categoriesData = {
    'Filter': {
        image: 'assets/category/Air-Oil-Separators[1].png',
        products: [
            { name: 'Hydraulic Filter', price: '₹1,500', description: 'High-efficiency hydraulic filter.', image: 'assets/products/hydraulic-filter.png' },
            { name: 'Air Filter', price: '₹800', description: 'Engine air filter for dust protection.', image: 'assets/products/air-filter.png' },
            { name: 'Oil Filter', price: '₹1,200', description: 'Engine oil filter for particle removal.', image: 'assets/products/oil-filter.png' },
        ]
    },
    'Electricals': {
        image: 'assets/category/electricals.png',
        products: [
            { name: 'Control Panel', price: '₹10,000', description: 'Complete control panel for machinery.', image: 'assets/products/control-panel.png' },
            { name: 'Sensor Module', price: '₹3,000', description: 'Precision sensor for machine diagnostics.', image: 'assets/products/sensor.png' },
            { name: 'Limit Switch', price: '₹800', description: 'Safety limit switch for machinery.', image: 'assets/products/limit-switch.png' },
        ]
    },
    'Coupling': {
        image: 'assets/category/coupling.png',
        products: [
            { name: 'Shaft Coupling', price: '₹2,500', description: 'Durable coupling for power transmission.', image: 'assets/products/shaft-coupling.png' },
            { name: 'Gear Coupling', price: '₹4,000', description: 'Robust gear coupling for heavy-duty applications.', image: 'assets/products/gear-coupling.png' },
        ]
    },
    'Pneumatics': {
        image: 'assets/category/pneumatics.jpg',
        products: [
            { name: 'Pneumatic Valve', price: '₹1,200', description: 'Reliable valve for pneumatic systems.', image: 'assets/products/pneumatic-valve.png' },
            { name: 'Air Cylinder', price: '₹3,500', description: 'Cylinder for compressed air applications.', image: 'assets/products/air-cylinder.png' },
        ]
    },
    'Pipe Line': {
        image: 'assets/category/pipe-line.jpg',
        products: [
            { name: 'Concrete Pump Pipe', price: '₹4,000', description: 'Robust pipe for high-pressure concrete delivery.', image: 'assets/products/concrete-pipe.png' },
            { name: 'Reducer Pipe', price: '₹1,800', description: 'Pipe reducer for connecting different sizes.', image: 'assets/products/reducer-pipe.png' },
        ]
    },
    'Hose Pipe': {
        image: 'assets/category/hose-pipe.jpg',
        products: [
            { name: 'Conveying Hose', price: '₹2,500', description: 'Durable hose for concrete and mortar.', image: 'assets/products/conveying-hose.png' },
            { name: 'Hydraulic Hose', price: '₹1,500', description: 'Flexible and durable hose for fluid transfer.', image: 'assets/products/hydraulic-hose.png' },
        ]
    },
    'Hopper Parts': {
        image: 'assets/category/hopper parts.jpg',
        products: [
            { name: 'Agitator Shaft', price: '₹7,500', description: 'Heavy-duty agitator shaft for uniform mixing.', image: 'assets/products/agitator-shaft.png' },
            { name: 'Mixing Paddles', price: '₹2,000', description: 'Replacement paddles for concrete mixers.', image: 'assets/products/mixing-paddles.png' },
        ]
    },
    'Hydraulics': {
        image: 'assets/category/Hyduralics.png',
        products: [
            { name: 'Hydraulic Pump', price: '₹25,000', description: 'High-performance pump for hydraulic systems.', image: 'assets/products/hydraulic-pump.png' },
            { name: 'S-Valve', price: '₹15,000', description: 'Critical S-valve for seamless concrete flow.', image: 'assets/products/s-valve.png' },
        ]
    },
    'Seals': {
        image: 'assets/category/seals.png',
        products: [
            { name: 'Oil Seal Kit', price: '₹800', description: 'Comprehensive kit for sealing hydraulic leaks.', image: 'assets/products/oil-seal.png' },
            { name: 'Gasket Set', price: '₹1,500', description: 'High-temperature gaskets for pump systems.', image: 'assets/products/gasket-set.png' },
        ]
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const categoriesGrid = document.getElementById('categories-grid');
    const productList = document.getElementById('product-list');
    const categoryTitle = document.getElementById('category-title');

    // Logic for categories.html
    if (categoriesGrid) {
        const categoryNames = Object.keys(categoriesData);

        categoryNames.forEach(categoryName => {
            const categoryCard = document.createElement('a');
            categoryCard.href = `products.html?category=${encodeURIComponent(categoryName)}`;
            categoryCard.classList.add('category-card');

            const categoryImage = categoriesData[categoryName].image;

            categoryCard.innerHTML = `
                <img src="${categoryImage}" alt="${categoryName}">
                <h3>${categoryName}</h3>
            `;

            categoriesGrid.appendChild(categoryCard);
        });
    }

    // Logic for products.html
    if (productList && categoryTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');

        if (categoryName && categoriesData[categoryName]) {
            categoryTitle.textContent = categoryName;
            const products = categoriesData[categoryName].products;

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                const whatsappMessage = `Hello ${COMPANY_NAME}, I would like to inquire about the following product:%0A%0AProduct: ${product.name}%0APrice: ${product.price}%0A%0AThank you!`;
                const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <a href="${whatsappLink}" target="_blank" class="whatsapp-buy-button">
                        <i class="fab fa-whatsapp"></i> Buy on WhatsApp
                    </a>
                `;
                productList.appendChild(productCard);
            });
        } else {
            // Redirect to categories page if no valid category is found
            window.location.href = 'categories.html';
        }
    }
});
